import React, { useMemo } from 'react';
// Chakra UI
import { Text, Link } from '@chakra-ui/react';
// Elementz
import { Table } from 'elementz';

export function OpportunitiesTable(props) {
  const data = useMemo(() => props.opportunities, [props.opportunities]);

  const companyColumn = {
    company: {
      title: 'Company',
    },
  };

  const columns = {
    type: {
      title: 'Type',
    },
    role: {
      title: 'Role',
    },
    location: {
      title: 'Location',
    },
    wam: {
      title: 'WAM Requirement',
      onRender: (wam) => (wam ? <div>{wam}</div> : <div>-</div>),
    },
    expiry: {
      title: 'Expiry Date',
      onRender: (link) => <div>{new Date(link).toLocaleDateString()}</div>,
    },
    link: {
      title: 'Application Link',
      onRender: (link) => (
        <Link href={link} isExternal color='blue.500'>
          Apply here
        </Link>
      ),
    },
  };

  return (
    <div>
      <Table
        onRowRender={(row, i) => ({ key: `${i}-key` })}
        className='m-0 p-0'
        data={data}
        columns={props.interact ? columns : { ...companyColumn, ...columns }}
        limit={props.limit}
        fixed={false}
        paginate={true}
        scrollable={true}
        sortable={true}
        filterable={true}
        searchable={true}
        selectable={false}
        expandable={true}
        actionHidden={false}
        loading={props.loading}
        // onAction={(row, i, isBulk) => {
        //   if (props.interact) {
        //     return (
        //       <Menu>
        //         <MenuButton as={IconButton} icon={<ChevronDownIcon />} />
        //         <MenuList>
        //           <MenuItem>Download</MenuItem>
        //           <MenuItem>Create a Copy</MenuItem>
        //           <MenuItem>Mark as Draft</MenuItem>
        //           <MenuItem>Delete</MenuItem>
        //           <MenuItem>Attend a Workshop</MenuItem>
        //         </MenuList>
        //       </Menu>
        //     );
        //   }
        // }}
        onExpand={(row) => <Text color='gray.800'>{row.description}</Text>}
        onMobile={(row) => (
          <div className='p-0 m-0'>
            {!props.interact && (
              <div>
                <Text as='span' fontWeight='semibold'>
                  Company:
                </Text>{' '}
                {row.company}
              </div>
            )}

            <div>
              <Text as='span' fontWeight='semibold'>
                Role:
              </Text>{' '}
              {row.role}
            </div>
            <div>
              <Text as='span' fontWeight='semibold'>
                Location:
              </Text>{' '}
              {row.location}
            </div>
            <div>
              <Text as='span' fontWeight='semibold'>
                Application Link:{' '}
              </Text>
              <Link href={row.link} isExternal color='blue.500'>
                Apply here
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}
