import styles from 'components/file/files.module.css';
import Loader from 'components/loader';
import Card from 'components/card';
import UploadFile from 'components/file/upload-file';
import { useSession } from '@roq/nextjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr/mutation';
import Select from 'react-select';
import FileCard from './file-card';
import { fileCategoriesQuery, filesQuery } from '../../graphql/queries';
import { graphqlRequest } from '../../utils/graphql-request.util';
import { UserFile } from './types';

export default function Files() {
    const { session } = useSession();
    const [fileCategory, setFileCategory] = useState<{ label: string, value: string }>();
    const [filesVars, setFilesVars] = useState<{ limit?: number, offset?: number, filter?: Record<string, unknown> }>({
        filter: {},
    });
    const { data: files, error, isMutating: isLoading, trigger: fetchFiles, reset } = useSWR(
        'file',
        graphqlRequest);
    const { data: fileCategories, trigger: fetchFileCategories } = useSWR('fileCategories', graphqlRequest)

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
        void fetchFiles({
            query: filesQuery,
            responseKey: 'files',
            variables: filesVars,
            accessToken: session?.roqAccessToken,
        })
    }, [filesVars])


    const onOptionChange = useCallback(
        (value: { value: string, label: string }) => {
            setFileCategory(value);
            setFilesVars((vars) => ({
                ...vars,
                filter: value?.value !== 'ALL' ? {
                    fileCategory: { equalTo: value?.value as string }
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

    const onSearch = useCallback(
        (e: any) => {
            e.preventDefault();
            const [{ value: entityName }, { value: entityIdentifier }] = e.target.children;
            setFilesVars((vars) => ({
                ...vars,
                filter: {
                    entityName: { equalTo: entityName },
                    entityReferences: { equalTo: entityIdentifier },
                },
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

    return (
        <div className={styles.feed}>
            <div className={styles.uploadContainer}>
                <Card>
                    <UploadFile
                        onSuccess={reset}
                        onDelete={reset}
                    />
                </Card>
            </div>
            <div className="flex w-100 space-between m5">
                <div className="flex">
                    <form className="p0 m0" onSubmit={onSearch}>
                        <input name="entityName" required type="text" className="input m5 mt-10"
                               placeholder="Entity Name"/>
                        <input name="entityIdentifier" required type="text" className="input m5 mt-10"
                               placeholder="Entity Identifier"/>
                        <button className="btn btn-sm mt-10" type="submit">Search</button>
                    </form>
                </div>
                <div className="flex">
                    <Select
                        value={fileCategory}
                        onChange={onOptionChange}
                        isClearable={false}
                        isSearchable={false}
                        isLoading={false}
                        options={options}
                        placeholder="Filter by File category"
                        styles={{
                            container: (curr) => ({
                                ...curr,
                                minWidth: '200px',
                            }),
                            singleValue: (curr) => ({
                                ...curr,
                                '::before': {
                                    content: '"Filter By "'
                                }
                            }),
                            control: (cur, state) => ({
                                ...cur,
                                cursor: 'pointer',
                                border: 'none',
                                borderColor: state.menuIsOpen ? 'var(--roq-user-invite-role-dropdown-boxShadow)' : '',
                                boxShadow: state.menuIsOpen ? '0 0 0 1px var(--roq-user-invite-role-dropdown-boxShadow)' : 'none',
                            }),
                        }}
                        components={{ IndicatorSeparator: () => null }}
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
