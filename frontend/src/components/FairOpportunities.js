import React, { useMemo } from 'react';
import { Table } from 'elementz';
import { Box, Link } from '@chakra-ui/layout';

export function FairOpportunities() {
  // const config = {
  //   rows: 10000,
  //   scrollable: false,
  //   expandable: false,
  //   searchable: true,
  //   filterable: true,
  //   sortable: true,
  //   selectable: true,
  //   fixed: true,
  //   empty: false,
  //   loading: false,
  // };

  const data = useMemo(
    () => [
      {
        type: 'Internship',
        role: 'Software Engineering Internship',
        company: 'Google',
        location: 'Sydney',
        wam: 50,
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
        expiry: '03/08/2021',
      },
      {
        type: 'Graduate',
        role: 'Software Engineering Graduate',
        company: 'Facebook',
        location: 'Remote',
        wam: null,
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions..',
        expiry: '09/08/2021',
      },
    ],
    []
  );

  const columns = {
    type: {
      title: 'Type',
    },
    role: {
      title: 'Role',
      filter: {
        custom: true, //Allow custom filter values
        multiple: true, //Allow multiple filter values
        negative: true, //Allow negative filtering ('is not')
      },
    },
    company: {
      title: 'Company',
    },
    location: {
      title: 'Location',
    },
    wam: {
      title: 'WAM Requirement',
      filter: {
        options: {
          Pass: (wam) => wam >= 50 && wam < 65,
        },
        Credit: (wam) => wam >= 65 && wam < 75,
        Distinction: (wam) => wam >= 75 && wam < 85,
        'High Distinction': (wam) => wam >= 85 && wam <= 100,
      },
    },
    expiry: {
      title: 'Expiry Date',
    },
  };

  return (
    <Table
      className='m-0 p-2'
      data={data}
      columns={columns}
      limit={5}
      loading={false}
      fixed={false}
      paginate={true}
      scrollable={true}
      sortable={true}
      filterable={true}
      searchable={true}
      selectable={false}
      expandable={true}
      onExpand={(row) => (
        <Box>
          <Box>
            <b>Summary: </b>
            {row.description}
          </Box>
          <Box>
            <b>Apply here: </b>
            <Link href={row.link} isExternal>
              {row.link}
            </Link>
          </Box>
        </Box>
      )}
      onMobile={(row) => (
        <div className='p-0 m-auto'>
          <div>
            <b>Role:</b> {row.role}
          </div>
          <div>
            <b>Company:</b> {row.company}
          </div>
        </div>
      )}
    />
  );
}
