const careerFairData1 = {
  university: 'UNSW', // Name of the University
  start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime(), // Start Date of fair in epoch time
  end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).getTime(), // End Date of fair in epoch time
  title: 'UNSW Winter 2021 Virtual Careers Fair', // Title of Career Fair
  description:
    'UNSW is hosting a Virtual Careers Fair highlighting companies with opportunities in technology.',
  website: 'https://unsw.edu.au',
  logo: 'BASE64_STRING',
  stalls: [
    // List of stalls in the career fair
    {
      id: '5678', // Unique ID of the stall
      company: 'Facebook', // Name of Company
      description: 'Facebook is a social media company',
      logo: 'BASE64_STRING',
      live: true, // If current time is inside any presentation ranges (HARD)
    },
    {
      id: '9876',
      company: 'Apple',
      description:
        'Apple is a software and hardware company known for their Macintosh computers and popular iPhones',
      logo: 'BASE64_STRING',
      live: false,
    },
  ],
  events: [
    // List of presentation events for that company
    {
      id: '111',
      title: 'Facebook Internship Presentation', // Presentation Title
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        14,
        0
      ), // Start Date of presentation in epoch time
      end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        15,
        0
      ), // Start Date of presentation in epoch time
      description: 'Description of the Presentation event',
      link: 'https://www.zoom.com/canva-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(25, 109, 212)', // color of the Dot
    },
    {
      id: '222',
      title: 'Apple Graduate Presentation',
      start: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).setHours(
        13,
        0
      ),
      end: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).setHours(
        14,
        0
      ),
      description: 'Description of the Presentation event',
      link: 'https://www.zoom.com/canva-id-link',
      color: 'rgb(50,50,50)',
    },
  ],
  opportunities: [
    // List of opportunities for that company
    {
      id: 111,
      company: 'Facebook',
      type: 'Graduate', // Type of Role Grad/Intern
      role: 'Mobile Engineer Graduate', // Name of role
      location: 'Sydney', // Physical Location or Remote
      wam: 'Distinction', // wam requirement otherwise null
      expiry: '09/08/2021', // When the opportunity expires
      link: 'https://www.facebook.com/careers', // Link to opportunity page
      description: 'Description of the Mobile Grad role',
    },
    {
      id: 222,
      company: 'Facebook',
      type: 'Graduate',
      role: 'Software Engineer Graduate',
      location: 'Sydney',
      wam: null,
      expiry: '10/08/2021',
      link: 'https://www.facebook.com/careers',
      description: 'Description of the Mobile Grad role',
    },
  ],
};
