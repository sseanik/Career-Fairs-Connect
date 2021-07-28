import React, { useMemo } from 'react';
import { Table } from 'elementz';
import { Box, Link } from '@chakra-ui/layout';

export function FairOpportunities() {
  const data = useMemo(
    () => [
      {
        type: 'Internship',
        role: 'Software Engineering Internship',
        company: 'Google',
        location: 'Sydney',
        wam: null,
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Software Engineering Graduate',
        company: 'Facebook',
        location: 'Remote',
        wam: null,
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Software Engineering Graduate',
        company: 'Microsoft',
        location: 'Remote',
        wam: 'Distinction',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
      },
      {
        type: 'Internship',
        role: 'Full Stack Intern',
        company: 'Netflix',
        location: 'Remote',
        wam: null,
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Cyber Security Intern',
        company: 'Atlassian',
        location: 'Sydney',
        wam: null,
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Frontend Engineering Graduate',
        company: 'Canva',
        location: 'Sydney',
        wam: 'Distinction',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
      },
      {
        type: 'Internship',
        role: 'Backend Engineering Internship',
        company: 'Canva',
        location: 'Sydney',
        wam: 'Credit',
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Cyber Security Graduate',
        company: 'DXE',
        location: 'Sydney',
        wam: 'High Distinction',
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Software Developer Graduate',
        company: 'IMC',
        location: 'Graduate',
        wam: 'Distinction',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
      },
      {
        type: 'Internship',
        role: 'Software Engineering Internship',
        company: 'Google',
        location: 'Sydney',
        wam: null,
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Software Engineering Graduate',
        company: 'Facebook',
        location: 'Remote',
        wam: null,
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Software Engineering Graduate',
        company: 'Microsoft',
        location: 'Remote',
        wam: 'Credit',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
      },
      {
        type: 'Internship',
        role: 'Full Stack Intern',
        company: 'Netflix',
        location: 'Remote',
        wam: null,
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Cyber Security Intern',
        company: 'Atlassian',
        location: 'Sydney',
        wam: null,
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Frontend Engineering Graduate',
        company: 'Canva',
        location: 'Sydney',
        wam: 'Distinction',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
      },
      {
        type: 'Internship',
        role: 'Backend Engineering Internship',
        company: 'Canva',
        location: 'Sydney',
        wam: 'Credit',
        expiry: '03/08/2021',
        link: 'https://careers.google.com/students/engineering-and-technical-internships/',
        description:
          'The intern position at Google empowers prospective software engineers with the learning capability and AGILE work experience to work on company tools and projects.',
      },
      {
        type: 'Graduate',
        role: 'Cyber Security Graduate',
        company: 'DXE',
        location: 'Sydney',
        wam: 'Distinction',
        expiry: '09/08/2021',
        link: 'https://www.facebook.com/careers/',
        description:
          'The Software Engineering Graduate role is involved with the Oculus team working on AR/VR emerging solutions.',
      },
      {
        type: 'Graduate',
        role: 'Software Developer Graduate',
        company: 'IMC',
        location: 'Melbourne',
        wam: 'High Distinction',
        expiry: '09/08/2021',
        link: 'https://www.microsoft.com/careers/',
        description:
          'Software Engineering Graduate position to work on Azure web services in particular managing Docker services.',
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
    },
    company: {
      title: 'Company',
    },
    location: {
      title: 'Location',
    },
    wam: {
      title: 'WAM Requirement',
    },
    expiry: {
      title: 'Expiry Date',
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
    <Table
      className='m-0 p-0'
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
      onExpand={(row) => <Box>{row.description}</Box>}
      onMobile={(row) => (
        <div className='p-0 m-auto'>
          <div>
            <b>Role:</b> {row.role}
          </div>
          <div>
            <b>Company:</b> {row.company}
          </div>
          <div>
            <b>Location:</b> {row.location}
          </div>
        </div>
      )}
    />
  );
}
