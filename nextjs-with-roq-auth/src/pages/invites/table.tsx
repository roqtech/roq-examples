import AppLayout from '../../layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { UserInvitesTable } from '@roq/nextjs'
import { SelectFilter } from 'components/file/select.filter';
import { useState } from 'react';

const options = [
  {
    value: 'en-US',
    label: 'English'
  },
  {
    value: 'de-DE',
    label: 'German'
  }
]
export const InviteTable = () => {
  const [locale, setLocale] = useState(options[0])
  return (
    <AppLayout>
      <DemoLayout>
        <SelectFilter
          value={locale}
          onChange={(val: any) => setLocale(val)}
          options={options}
          isClearable={true}
          prefix="Locale:"
        />
        <UserInvitesTable locale={locale?.value} />
      </DemoLayout>
    </AppLayout>
  );
}


export default InviteTable;