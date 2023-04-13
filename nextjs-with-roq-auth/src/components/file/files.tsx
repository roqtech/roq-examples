import styles from 'components/file/files.module.css';
import Loader from 'components/loader';
import Card from 'components/card';
import UploadFile from 'components/file/upload-file';
import { useSession } from '@roq/nextjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr'
import FileCard from './file-card';
import { fileCategoriesQuery, filesQuery } from '../../graphql/queries';
import { graphqlRequest } from '../../utils/graphql-request.util';
import { UserFile } from './types';
import { SelectFilter } from './select.filter';
import { routes } from '../../routes';
import { FileInterface } from '@roq/ui-react/dist/features';

type OptionType = { label: string, value: string };
const fetcher = (url: string, options: RequestInit) => fetch(url, options).then((res) => res?.json())
export default function Files() {
    const { session } = useSession();
    const [fileCategory, setFileCategory] = useState<OptionType>();
    const [selectedAssociationFilter, setSelectedAssociationFilter] = useState<OptionType>();
    const [selectedAssociation, setSelectedAssociation] = useState<OptionType>();
    const { data: fileAssociationsData } = useSWR(routes.server.fileAssociations, fetcher);
    const { trigger: createFileAssociation } = useSWRMutation(routes.server.createFileAssociation,
        function <T>(url: string, { arg }: { arg: T }) {
            return fetcher(url, {
                method: 'POST',
                body: JSON.stringify(arg)
            })
        });
    const [filesVars, setFilesVars] = useState<{ limit?: number, offset?: number, filter?: Record<string, unknown> }>({
        filter: {},
    });
    const {
        data: files,
        error,
        isMutating: isLoading,
        trigger: fetchFiles,
        reset,
    } = useSWRMutation('file', graphqlRequest);

    const { data: fileCategories, trigger: fetchFileCategories } = useSWRMutation('fileCategories', graphqlRequest)


    const triggerFetchFiles = useCallback(
        () => {
            return fetchFiles({
                query: filesQuery,
                responseKey: 'files',
                variables: filesVars,
                accessToken: session?.roqAccessToken,
            })
        },
        [filesVars, session],
    );

    useEffect(() => {
        if (!session?.roqAccessToken) {
            return;
        }
        fetchFileCategories({
            query: fileCategoriesQuery,
            accessToken: session.roqAccessToken,
            responseKey: 'fileCategories'
        });
        setFilesVars((vars) => ({
            ...vars,
            limit: 10,
            offset: 0,
        }))
    }, [session])

    useEffect(() => {
        if (!session?.roqAccessToken) {
            return;
        }
        void triggerFetchFiles();
    }, [filesVars])


    const onOptionChange = useCallback(
        (newVal: unknown) => {
            const option = newVal as OptionType;
            const { value } = option;
            setFileCategory(option);
            setSelectedAssociationFilter(null);
            setFilesVars((vars) => ({
                ...vars,
                filter: value !== 'ALL' ? {
                    fileCategory: { equalTo: value as string }
                } : {}
            }));
        }, []);

    const onAssociationChange = useCallback(
        (newVal: unknown) => {
            const option = newVal as OptionType;
            setSelectedAssociationFilter(option);
            if (option) {
                setFileCategory(null);
            }
            setFilesVars((vars) => ({
                ...vars,
                filter: option ? {
                    entityName: { equalTo: option.label },
                    entityReferences: { equalTo: option.value },
                } : {}
            }));
        }, []);

    const onLoadMore = useCallback(
        () => {
            setFilesVars((vars) => ({
                ...vars,
                limit: vars.limit + 10,
            }));
        }, [],
    );

    const options = useMemo(() => {
        const optionsList = fileCategories?.data
            .map(({ name, key }: { name: string, key: string, }) => ({
                value: key,
                label: name,
            }))
        if (optionsList?.length) {
            return [
                {
                    label: 'All',
                    value: 'ALL'
                },
                ...optionsList,
            ]
        }
        return optionsList;
    }, [fileCategories]);

    const fileAssociationOptions: OptionType[] = useMemo(() => {
        return fileAssociationsData?.data
            ?.map((
                { entityName: label, entityReference: value }:
                    { entityName: string, entityReference: string }
            ) => ({
                label,
                value
            }));
    }, [fileAssociationsData]);

    const onSuccess = useCallback(
        async (file: FileInterface) => {
            await createFileAssociation({
                fileId: file.id,
                entityName: selectedAssociation.label,
                entityReference: selectedAssociation.value,
            })
            reset();
            return triggerFetchFiles();
        }, [createFileAssociation, selectedAssociation, reset, triggerFetchFiles],
    );


    return (
        <div className={styles.feed}>
            <div className={styles.uploadContainer}>
                <Card>
                    <div className="flex w-50 flex-center m5">
                        <SelectFilter
                            value={selectedAssociation}
                            onChange={(v) => setSelectedAssociation(v as OptionType)}
                            options={fileAssociationOptions}
                            placeholder="Upload with Associations"
                            isClearable={true}
                            prefix="Upload with"
                        />
                    </div>
                    <UploadFile
                        onSuccess={onSuccess}
                        onDelete={reset}
                    />
                </Card>
            </div>
            <div className="flex w-100 space-between m5">
                <div className="flex">
                    <SelectFilter
                        value={selectedAssociationFilter}
                        onChange={onAssociationChange}
                        options={fileAssociationOptions}
                        placeholder="Filter by Associations"
                        isClearable={true}
                        prefix="Filter by"
                    />
                </div>
                <div className="flex">
                    <SelectFilter
                        value={fileCategory}
                        onChange={onOptionChange}
                        options={options}
                        placeholder="Filter by File Category"
                        prefix="Filter by"
                    />
                </div>
            </div>
            <div className={styles.listContainer}>
                {files?.data?.map((file: UserFile) => (
                    <FileCard file={file} key={file.id}/>
                ))}

                {error ? <>{JSON.stringify(error)}</> : <></>}
                {isLoading ? <Loader/> : <></>}
            </div>
            {
                files?.totalCount > files?.data?.length && (
                    <div className="flex flex-center mt-20">
                        <button disabled={isLoading} className="btn btn-sm btn-default" onClick={onLoadMore}>Load more
                        </button>
                    </div>
                )
            }
        </div>
    );
}
