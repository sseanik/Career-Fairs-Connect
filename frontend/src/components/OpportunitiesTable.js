import React from 'react';
import { Table } from 'elementz';
// Redux
import { useSelector } from 'react-redux';
// Chakra UI
import {
  Text,
  Link,
  Button,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import { RiPencilFill } from 'react-icons/ri';
// Components
import { OpportunityModal } from './OpportunityModal';

export function OpportunitiesTable(props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeRow, setActiveRow] = React.useState({});
  const userDetails = useSelector((state) => state.user);

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
      <OpportunityModal
        isOpen={isOpen}
        onClose={onClose}
        id={activeRow.id}
        type={activeRow.type}
        role={activeRow.role}
        location={activeRow.location}
        wam={activeRow.wam}
        expiry={new Date(activeRow.expiry)}
        link={activeRow.link}
        description={activeRow.description}
        edit
      />
      <Table
        className='m-0 p-0'
        data={props.opportunities}
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
        onAction={(row) =>
          userDetails.role === 'Company' &&
          userDetails.name === props.company && (
            <Button
              leftIcon={<RiPencilFill />}
              size='sm'
              ml='3'
              onClick={() => {
                setActiveRow(row[0]);
                onOpen();
              }}
            >
              Edit
            </Button>
          )
        }
        onExpand={(row) => (
          <Text color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
            {row.description}
          </Text>
        )}
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
