export function getStallData(stallID) {
  return new Promise((resolve) => {
    let stall;
    switch (stallID) {
      case '9876':
        stall = companyStallData2;
        break;
      case '5678':
        stall = companyStallData1;
        break;
      case '1357':
        stall = companyStallData3;
        break;
      default:
        break;
    }
    setTimeout(() => resolve(stall), 1000);
  });
}

const companyStallData1 = {
  fairID: '1234',
  company: 'Facebook', // Name of Company
  title: 'Facebook Virtual Fair', // Name of stall
  description: 'Facebook is a social media company',
  logo: 'data:image/png;base64,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',
  live: false, // If current time is inside any presentation ranges (HARD)
  website: 'https://facebook.com',
  opportunities: [
    // List of opportunities for that company
    {
      id: '111',
      type: 'Graduate', // Type of Role Grad/Intern
      role: 'Mobile Engineer Graduate', // Name of role
      location: 'Remote', // Physical Location or Remote
      wam: 'High Distinction', // wam requirement otherwise null
      expiry: new Date(
        new Date().getTime() + 11 * 24 * 60 * 60 * 1000
      ).getTime(), // When the opportunity expires
      link: 'https://www.facebook.com/careers', // Link to opportunity page
      description: 'Description of the Mobile Grad Facebook role',
    },
    {
      id: '222',
      type: 'Graduate',
      role: 'Software Engineer Graduate',
      location: 'Remote',
      wam: null,
      expiry: new Date(
        new Date().getTime() + 10 * 24 * 60 * 60 * 1000
      ).getTime(),
      link: 'https://www.facebook.com/careers',
      description: 'Description of the Facebook Mobile Grad role',
    },
    {
      id: '333',
      type: 'Internship',
      role: 'Software Engineer Internship',
      location: 'Remote',
      wam: 'Credit',
      expiry: new Date(
        new Date().getTime() + 10 * 24 * 60 * 60 * 1000
      ).getTime(),
      link: 'https://www.facebook.com/careers',
      description:
        'Description of the Facebook Software Engineering Internship',
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
      description: 'Description of the Facebook Intern Presentation event',
      link: 'https://www.zoom.com/facebook-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(25, 109, 212)',
    },
    {
      id: '222',
      title: 'Facebook Graduate Presentation', // Presentation Title
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        15,
        0
      ), // Start Date of presentation in epoch time
      end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        16,
        0
      ), // Start Date of presentation in epoch time
      description: 'Description of the Facebook Grad Presentation event',
      link: 'https://www.zoom.com/facebook-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(25, 109, 212)',
    },
  ],
  qandas: [
    // List of all questions and answers
    {
      id: '222',
      question: 'Will the internship give any freebies?', // Question posted by a student
      answer: 'Freebies will be shipped from San Fran HQ', // Answer posted by the company
      creatorId: '0'
    },
    {
      id: '111',
      question: 'Will Covid be a factor in the hiring process?',
      answer: '',
      creatorId: '1'
    },
  ],
};

const companyStallData2 = {
  fairID: '1234',
  company: 'Apple', // Name of Company
  description: 'Not the fruit, the company',
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA14AAAQACAQAAABb8kBwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAERCSURBVHja7d13nFfVnf/x18wwVEF6FREVQUEEKwiKBRuCFWyJLRpT9BdNMZpmTHY3MdmNiSZm1USNoq7dYAcULKAooALSBem99zrz+8MOM8N8+z33vp7zeOxGnfl+7/2cA+/5nHu+94IkSYEpsgSSEqgWbWhNK/b/7P+24gC2WJZw1LAEkhKhLp3oRGc6cQBtaLrbf2/JHItkeElS4e3NgexPZw6hMx0pqfJ7DS/DS5IKqJSu9OYIjuDgFC6NtLRwhpck5d/+n0XWkdRK46cNL8NLkvLYZx1DX/pwBPUzep0WltLwkqRcK+JQ+nIyx7NXVl7PzsvwkqQcakVv+nImbbL6qo0trOElSdlXzLGcw9kcmJNX39sCG16SlN2/qXowiIG0zuF7NLTMhpckZUddTmYQZ+WhL7LzkiRlrD6X8zJbKM/T1yJLLklKXzG9uYf1eYutT782WXhJUno6cxsL8hxbn3+VWn5JUmoacQ2jChRbn37VdxAkSdVVxMk8w7aCBlc55RXcaV6SpArU5xomFTy2Pv1q7XCEw63ykgqlA1dxDY0iczw1HRJJUuWK6cvzlEWk4/r86yAHxs5LkirWgO/xffaN4JHVcnAML0naXTOu59rI3ojJrfKGlyTtogU/5DrqRfgIyxwkw0uSvtSeG7iG2hE/SsPL8JKkz3Thp1wcxN81hpfhJUlAZ/6TsykK5GjLHTDDS1LSteWXXEVJQEe800EzvCQlWRNu5PrIX+PalcuGhpekxKrHdfwsyEc7bnPwJCmJSrmGxRG7b0b1v5o5gJKUPIOYHWxwlVMe6c+gSZJy4CBeDjq4yikLZlekJCkL6nErWwOPrnI2OpAhccOGpMwM4C7axuA8DK+gFFsCSWk7jLd4LhbRZXgZXpISoSF3MI7esTmfVQ5pSFw2lJSOAdxN61id0QoH1c5LUpw15yGei1l0wUoH1s5LUnwN4u80jeF5GV6Gl6SYasnfOTem52Z4GV6SYtpz3U3j2J6d4WV4SYqddtzDabE+w+UOckjcsCFpz77BxJhHFyxwmA0vSfFRn3t4mAaxP0/DKyjeiFJSVY7kUTok4DzLqOPzvOy8JMXjl9vrGZ2I6IJlRldY3LAhqWLN+RdnJOZsXTS085IUA/2YlKDogoUOueElKWyl3M4LNE/UOc922MPisqGkr2vK45yUuLP+2IE3vCSF63CeoV0Cz9vwCozLhpK+dCmjEhldhpckBaomd1Ce0K/trkKFxgGTBNCap+iZ2LP/hB1OgbC4bCgJejEuwdEF05wChpek0HybkbRKdAUmOQkML0khKeJW7qU04VUwvILjNS8pyWpyH9+0DIZXiL91SUqqRjzDCZaB7ezlbXntvCSFYT9e4mDLAEwzusLjNS8pmY7kHaPrMxMsgeElKQSnMoKWluEzYy2B4SUp+r7DS9S3DF8YZwnC44YNKWmu407/5H/FDhqw2TLYeUmKspv4q9H1NZOMrhC521BKjiL+yE8swy684mV4SYqwYv7G9yzDbrziZXhJiqwS/sGVlqECb1mCELn2LSVBKY8wyDJUYDktKLcMdl6SoqcWj3GOZaik7zK6DC9JkYyuIZxmGSoNLwXJrfJSvJUw2OiqwpuWIExe85Li/evpYC6xDJVaR2N2WgY7L0nR+uX070ZXlUYaXYaXpKj5I9+xCFUabgkkKVr+k3K/9vDVwWkiSVHyQ6Npj19znCbhctlQiqNrud0i7NFQS2B4SYqOi/mrRagGr3gFzK3yUtwcx3BqWYY92k5z1lgGOy9JUdCJfxtd1TLS6DK8JEVDU56nsWWoliGWIGQuG0rxUYcR9LAM1VJOO+ZbBjsvSYX/0/yI0VVtHxhdhpekKLiDcy1CtT1nCQwvSYX3Y66zCCl4yhKEzWteUhycw9P+KpqCKXS2CHZekgqrI//yz3JKHrcEdl6SCqs+YzjEMqTkEKZaBDsvSYX8BfR+oytFE4wuw0tSYf2cgRYhRU9agjj81iYpXKfwMiWWISXlHMhsy2DnJalQ9uNRoytlrxtdhpekwqnD0zS1DCl70BLEgcuGUqge5WKLkLINtGKDZbDzklQY3zW60vK00WXnJalQDmYcdS1DGk5ipEUwvCQVQi3G0M0ypGEWHSi3DHHgsqEUnj8YXWm62+iy85JUGKfxsn9y07KNfVhuGey8JOVfc/5ldKXpSaPL8JJUCEXcR0vLkKZ7LIHhJakQrqe/RUjTZN6yCIaXpPzrxm0WIW13WoI4ce1cCkUN3qO7ZUjTKtqyyTLYeUnKt58ZXRn4u9Fl5yUp/zryIbUtQ5q2056FlsHOS1K+/6T+0+jKwP8ZXYaXpPy7jt4WIW3l/NkixI3LhlL0teMj9rIMaXuZfhbBzktSvt1rdGXk95bA8JKUb9/iVIuQgTF+ODmOXDaUoq0lU2hkGTJwJi9ZBDsvSfl1u9GVkQm8bBEML0n51YuLLEJGfusTvOLJZUMpyr9cvscRliEDk+hGmWWw85KUT98xujL0C6PLzktSfjViBk0tQwbGc5SLhnZekvLrt0ZXhn5ldNl5ScqvLnxADcuQgbfpZRHsvCTl15+MrgzdZAkML0n5NdC7amRoCKMsQpy5bChFT22msp9lyMBOujLFMth5Scqn7xldGXrA6LLzkpRfezGL5pYhA5vp4MMn7bwk5df1RleG/mh02XlJyq+GzKKxZcjAAjqx0TLYeUnKpxuNrowraHTZeUnKq6bMpr5lyMDb9Pa+GnZekvLrF0ZXRsq4weiy85KUX/swk9qWIQP/4BqLYOclKb9uMboyspKfWwTDS1J+tecKi5CRG1lhEQwvSfn1Y0otQgZG8S+LkBxe85KioTHzqGcZ0raDI5lgGey8JOXXdUZXRm43uuy8JOVbXebQzDKkbSaHsdky2HlJyq8rja4MlPM9o8vwkpRvJdxgETJwN69ZhKRx2VAqvAt43CKkbRGdWWMZ7Lwk5dtPLEEGrjG6DC9J+XciR1mEtN3HixYhiVw2lArtefpbhDTNpSvrLIPhJSnf2vIJJZYhLWX0ZaRlSCaXDaXC+rbRlba/Gl12XpIKoQZzaGMZ0jKNI9hkGey8JOXfmUZXmrZyidFleEkqDB+dmK4f8oFFSDKXDaXCcbNGup5moEWw85JUGFcbXWmZZ8cqOy+pUEqYzb6WIWXb6cM7lsHOS1Jh9De60vIzo0uGl1Q437YEaXiR2y2CXDaUCqUZi6hhGVK0kG6ssAyy85IKZZDRlbIyLjO6ZHhJhXSBJUjZLxlhEfQplw2lQmjFfLfJp+hpBlFuGWTnJRXORUZXij7kcqNLhpdUWBdagpSs4Dw2WgZ9yWVDKf/aM8s/eynYzim8YRlk5yUV1kVGV0quM7pkeEmF56JhKv7KvRZBu/L3PynfOjLNIlTbW/Rlm2WQnZdUaIMsQbXN5lyjS4aXFAX9LEE1redsVloGVcRlQym/GrPMz3hVy3YGMNQyyM5LioLTjK5qKedqo0uGlxQVZ1iCavkJD1kEVc5lQym/vy4uprll2KP/4UaLIDsvKSqOMLqq4TFusggyvKTocKfhno3kCsosgwwvKTq84rUnEzmXrZZBe+I1Lyl/mrLEvYZVmk0vllgG2XlJUXKq0VWlpZxmdMnwkqKmryWownJO5mPLIMNLiprelqBSqzmdyZZB1eU1LylfmrHUP3GVWMMpjLMMsvOSoth3GV0VW8upRpcMLymaelmCSqNrrGWQ4SUZXuFYx2m8ZxmUKpcxpPyowxpqWoZdbKQfb1oG2XlJUXWU0bWbTfQ3umR4SVHmouGu1nAar1sGpaeGJZDyws94fd1STudDy6B0ec1Lys+ftBU0tgxfmMOpzLQMSp/LhlI+dDC6vmIyvYwuGV5S9B1uCb4wlhNYZBlkeEnR180SfGYEJ7PCMsjwkkLQ3RIA8G/OZL1lkOElheEwSwA8yCC2WAYZXlIYWtEi8TUo59dcyQ4ng7LDz3lJudcl8RXYytU87ESQ4SWF5JCEn/8KzuMtp4EMLyksByf67D9iAHOcBMour3lJhlcuDaO30SXDSwpRcpcN7+VM1joBJCk8TShP5NcOrnPwlSte85Jy7YBEnvUaLuYVB1+Gl2R4heNDBjLLoVfueM1LMryybTC9jC4ZXpLhFY6t3MBlbHLYlVsuG0qGV/Z8wkDed8hl5yWFr11izvQljjS6ZHhJ8fgz1ioR51nOHxjAKgdc+eGyoZRbLShNwFku5VKGO9iy85LiYt8EnONQuhtdMrykONkn5ue3mRs4g8UOtPLLZUMpt1rH+uzG8U2mO8iy85LiJr7PUC7jTnoZXbLzkuKoWUzPax6X8YbDKzsvyfAKx5N0M7pkeEnx1TR2Z7SI87iA1Q6tDC8pvprH6mzKGcyhPOuwqtC85iXlVpMYncs0ruEth1SS4m9rTJ6LvI3bqO1wSlIS1IlJdL1NZwdTUeI1LymXGsTgHDZxM8cx2cGUpKQ4MPCOq4yHaOMwKnrcsCHl0t5BH/04bmC0g6goctlQyqV6wR75Qi7jaKNLdl5SEoW5P28bd/NL1jt8MrwkwysUL/ADPnHoFG0uG0q5VCuw432HPgwwumR4SXZeoZjEBfTiTQdNIXDZUDK8YAq38hTlDpgML0lh/An7hNu4j50OlvyjJSkMc/kd97PDQsjwkhSGKfyJwWy3EDK8JH1dUUSPazR38IxLhTK8JIWhjJf4L8ZYCBleksKwnvu4gzkWQoaXpKpE54rSbO7lHtY4JDK8JIUQXlt5jsG85BUuGV6Sqmdbgd9/Gv/ifpY7EDK8JKXS9RTKZl7gXl51CGR4SQqh89rCMJ7iWTZYfhlekqLfeW3mFZ7ieZ/EJcNLUiY25i22XuNJnjW2ZHhJyty6nL/DNF7lVYazyWLL8JKUHbnrhJbxBq8ylLkWWYaXpKh3XvMZz+u8ymSLqyQrsgRSDpVmab/hYsYznvGMZYlFlQwvKdeGcygt0vrJBXzMTD5mAu/7MWPJ8JLybW86si9taE1rGtOA+tSnBvU/+6+rgbVsYhWrWM1y5rOAhcxns4Wrtro0oyWNqU9D6lOfvahPA0qAUvb64rt2fraMu4n1bGAN61jPBlawjEV+Ks7wkqRcqkEr2rEv+9CWdjSnBc2pm/GrbmYpi1nOYhYzl4UsYK47OA0vRV8JDWlIQ0pYzWpWexNXRUgp+9GBDnTgQA6kXd42mq1iAfOYwyxmM5tZ9sKGlwpnb/ahKS1pRjOa0ZKmNKIhDb+ytPKpdaxmNStYwlIWsoyFLGVhHj61JH3+d1N7utCZQ+lMJ2pG4pgWM5uPmc40pjA7Qo+7MbwUO7XZn/bsRxv2oQ2taUu9jF5vNXOZw1w+YS6zmelvosp6j3UIh3M43Tlst1+oomU7HzOF6XzEJKaxw6EzvJSZhhxERw6iPe1pT6ucvlc585jBDGYwnSnMt/hK20H04BiO5lBqBXj0W5nMJCYygQmscDANL1VXa7rQlYM4iE5pbsrOhjV8xEdM5CMm+bxeVUtdenAsPehBk9ic01zG8R7jGOciu+GlitShK4dxKF3oSuPIHd2szz5SO94YU4Wztyd9OJFjInItKxfKmMFY3mUUH7n9yfBSHQ7jCI7gCA4J5NZes3iH0YxiCmUOX+LVpgcncCLHBLk4mK51vMNoRvNu3p4xYHgpMg6gJz05li7B3o1yNW8zmlGMZYvDmTi16MGJnMAx1E5wFXbwPiMYwWg/P2Z4xV0NjuI4jqVHAa9kZdtWxjOKUbzNSgc4AfbjDM7gpAx3ucbLVsYwgtd4z832hlfclHIUfTiBYyO+WTgT5UxhGMN4099CY9prHccZnMHBlqJS63mNl3mFeZbC8ArfoZzKKfRO0O+pWxjFMIYxkXKHPya91umcwcn2WtU2mZd5hbey9PwBw0t51Yy+nMqptE5sBZYwnGEMZ6mTIVAl9OIs+tlrpWkdL/MsL7vB3vAKRVf6M4CjKbYUQDkTGMpzjHFvYkDq0JdzGEAzS5GxrYzgWZ7zlzjDK7pqcQID6E87S1GBpTzPEF51Z2LENeJMzuF0lwizrIxRPM5TLLMUhleU1OYUBnEWe1uKPdjMazzPEH8LjaBmnMEgTo3xh4yjEGHv8CSP+iBSw6vw6nAGA+n/xUMIVR07eYshDOETSxEJBzKQ8zjSvzvyZBtDeYQhrkIYXoVRg75cwjnGVgY+5AmeYJaFKJgODGQQ3S1EAazmMR7kXQtheOWzwsdwCRfS3FJkxTie4EnmWIi8OohBDKSbhSiwqTzIYBZZCMMr1/bhcq7gQAuRZeW8xxM86UNY8qAjgxjIYRYiMnbwAvcwzP24hldu1OQsvsWplFiKHEbY2zzBU/4emrNu60IG0tVCRNIn3MsDyd7KZHjl4nfV7/JNmlqIvChjJA/zjB/tzKJ2XMhFXtuKvG38m7t40/BS5kroxw842arm3RZe5SGGeIOdDDXlPC7jWGdwQD7gbh5K4l5EJ2m2tOEark7w7Z2iYAWP8wjvWIi0Yut8LuJ47/QSpMXcxT2sMLyUqiP5IYMotRCR8DGP8AgzLUQ1NeQcLqRvsE+K06c2M5j/5mPDS9VTzJn8gL4WInLGM5hHkva7aIrq0JdBnE9dSxETZbzEbxlreKlqdbmKG9jfQkTWFobwEEPZaSl2i61+XMiZxlYMlfMyv2eU4aWKNeJafuBdtIOwhEd4kEkWAoCanMYFnO29XmLuLW5lhOGlr2vB97iehhYiKFN4iH8l+nMxJfRkEBf7K1dijOaWOAeY4ZWatvyMb1HLQgRpO6/wIC+wNWHnXczxXMj5xlYCDecWxhheBtfNXGVwBW8V/8fghNzitIieXMhAP8KRaC/xcyYYXkm1DzdztcEVI1N5iIdZEOMzPIILucCHnQooYzC/itu9QA2vPWvCzVxHbQsRwz/SrzGYZ9kQs/PqwkVc6A2h9TVbuJPfs8bwSop6XM9PfeZxrG3kWR7m1VhsqO/KeQziEAdVFVrFf/G3uNxEzfCqXClX8ytaWYhEWMz/MZgPg/1zfBTncb7dlvZoOj/kZcMrzvryZ7pYhoSZwpM8yCcBHXExx9Lf2FJKXuUHTDW84qgLf+JUy5BQZbzF4zzF8sivDJzI+ZzjM7qVhq38mf8K+2qv4bWrZvyGb3uT0sTbwQge51lWR/DYGnAaA+hPI4dJGVjID3jG8IqHYr7Jn3yMpL6wk5EM5t+RedTlfpzKAE7xQxvKkhe5lrmGV+h6cpdPj1UFtvASQ3iRlQU7ghJ6MoD+7iNU1m3gFv7KDsMrVM25jSushqrswkbxHM/l+YlJe3Ma/elHEwdAOfM+1zDe8AoxwK/ij14/UDVN4TmG8B5lOX2XGhxNX/rSw4ecKg928Ad+G9YnwAyvg7iXPs5dpWgpwxnBiBxcL+hEX07hBBpYZOXVJK7gfcMrDKX8iFu98ZMysJhRvMrLWbhvXHP60JfTvBuhCth//Ylfh/LUhSSH11Hc78eQlRXlTGEEb/NuGh9w3odeHMuJdHEdRBEwkUuZaHhFVy1u4ad+mktZt5x3Gc8kJjC7yqtiNejGsfSkF20tmiJlCz/jDsoNryg6nAftuZRjm5jMTGYxi1nMYxlbAGhCT3rSi6Ooa4kUWUO5giWGV7SU8itudgeX8m41i6lBBxcHFcgawlU8b3hFR0ce5kjnpSTtQTl38ZPobt9IVnhdxl3s5ZyUpGp5nwuYFc1DK07MIDTk/3jQ6JKkajuc9xkYzUMrScgQnMSr9HQmSlJKajGIvRiZ4zvKpCEJy4Yl/IpfJiamJSnbRjEoarsP4x9ezRnsgyUlKSOLOI93o9WVxNtJDKOb806SMlKfS1nEB4ZXPhTza/7p7U0lKQtqcDaNeDUqV7/iu2zYkIc50/kmSVk0ggsK+FjWBIRXV57hAOeZJGXZLM5keuEPI56f87qEd4wuScqBAxhNb8MrF73krTzsTU8lKUea8CrfLPRBxG3Dxl48zne99akk5VANzqWINwyvbGnPaxzvvJKkHCviBNrwUuGe+xWnHuU4nqGpc0qS8uTfXPzZk+oMr7QNZDC1nUuSlEdvchZrC/HGcdmwcT2PG12SlGfHM4o2dl7pqcFdXOMckqSCmM0pzDa8UlWPJ+jn7JGkglnAycwwvFLRkBfo5cyRpIJayilMMryqqwWveM94SYqA1ZzGWMOrOvZlOAc5YyQpEtZwev6e+RVueHVkOG2dLZIUGWs5lfcMr6p0YRitnCmSFLH46su4fLxRmJ/zOpo3jC5Jipy9GUZ3w6tiJ/EajZ0jkhRBjRjKIYbX7s7mRfZyfkhSRDVjBJ1y/SahXfMayGOxe4yLJMXNPHqxwPD63On8m1rOCkmKvJn0ZlnuXj6kZcNTeNbokqQgdOCFXF7iCSe8evOs942XpGAclcu1slCuH/XkFbdpSFJQ9udAns3N05bDCK+jGEoD54EkBaYLDRia1PDqynAaOQckKUA9WZWLW0ZFP7w68hrNHX9JCtSpTGB6tl806lvlD+RNbwQlSUHbQB/eT1J4NWW0Dz2RpOAtpgfzsvmCUd4qX5cXjC5JioFWPJ/dHePRDa8SHuYYR1ySYqErg7OZONHdsHEHlzvakhQbnSjnjbiH1038wpGWpFjpw1QmZ+elorlh40IeDfQxmZKkym3gWCbFNbz6MNQb8EpSLM3mKFZl/jLR628O8d7xkhRb+2dn40bUrnm1YiQtHV1Jiq0ObOetTF8kWsuGpbzGcY6sJMVaGWcwLLOXiNay4d+MLkmKvWIGs098wus7XOOYSlICNOdJambyAtG55tWTx6jhiEpSIuxDbYan/+NRuebVknG0cTQlKTHK6c9LYYeXGzUkKXmWcRhL0vvRaFzz+qvRJUmJ05wH0m2honDN6zL+0zGUpAQ6kNW8m84PFn7Z8Bje8I4akpRQWzmUman/WKGXDZvytNElSQm1lKvSiS4KvDm9iH+6x1CSEqmch/kRK9L74cKG13Wc7fhJUgJN4ru8nUnvUzhdeI86jqAkJcxm/sjv2JbJSxQuvOoylkMcQ0lKmJe5lk8yfZHCbdj4i9ElSQmzlu/QL/PoKlzndR5PO4qSlCjDuJr52XmpwoTXPkygseMoSYmxjhv5B+XZerlC7DYsZrDRJUkJ8hZXMiu7QZJ/t3CCIylJCbGJmzkhu9FViGXDHoyK0FPEJEm59B6XZDu4CtF51eKfRpckJUI5d3JcLqIr/9e8fk1nx1OSEmApV/BKrl48v8uG3XiPUkdUkmJvGJen+6DJ6sjnsmEN7je6JCn2tnADp+cyuvK7bPgLujumkhRz07iQibl+k/wtG3ZlLDUdVUmKtee4jLW5f5t8LRvW4D6jS5JibQc3c04+oit/y4Y3cqTjKkkxtpyLeS1fb5afZcOOfEhtR1aSYms0F7Aof2+Xj2XDIu43uiQpxu7kxHxGV36WDa/gWEdWkmJqK1fzcL7fNPfLhg2YTktHV5JiaQXn82b+3zb3ndd/GV2SFFOTOIs5hXjjXHdeXfigIM8MkyTl2stcxLrCvHVuN2wU8TejS5Ji6U76Fyq6cr1seCl9HF9Jip1tfJcHCnkAuVw2bMA0WjnGkhQzGxjI0MIeQi47r98YXZIUO0s4k/cLfRC567w684EPQJGkmJnN6cws/GHkbsPGX40uSYqZcfSMQnTlLrzO50RHWZJi5RVOZFk0DiU3y4Y1mMxBjrMkxchgrmJ7VA4mN53Xt40uSYqVe7giOtGVm86rHjPdZyhJMXIX/4/yKB1QLjqvHxldkhQjf+C6aEVXLjqvpsyigWMtSbGJrpujd1DZ77x+aXRJUmz8KorRlf3Oqz1TqeVoS1IMlPMD/hbNQ8t25/UfRpckxcRPoxpd2e68uvJBjh+yIknKj5/z++geXHaj5o9GlyTFwm+jHF3Z7bx68rbjLUkxcAc3RPsAs9kp/drxlqQYuI8fRv0Qs9d5Hc64nD7aUpKUDw/yLcqifpDZ67x+bXRJUvCe5aroR1f2Oq/D+MDwkqTAvctJbArhQLPVef3C6JKkwE2hXxjRla3O62A+cpO8JAVtEccyN5SDzU7k/NzokqSgraNfONGVnc7rAKZRw5GXpGBtox+vhXTA2eiYfmZ0SVLAyrk0rOjKRufVlo+p6dhLUrBu5TehHXLmndeNRpckBexJfhveQWfaeTVgvg+flKRgfcBxbAzvsDPtvK42uiQpWEs4O8ToyrTzKmEG+zv6khSkLZzImDAPPbPOa4DRJUmBKueqUKMr0/C6wdGXpED9mUfDPfhMlg0PZaKjL0lBGkMftoV7+Jl0Xj9y9CUpSMsYGHJ0ZdJ5NWMetZ0BkhScMk5neNinkH7n9X2jS5KC9MvQoyv9zqsmc2npDJCk4LzIWSE8Kzk3ndeFRpckBWgul4YfXemH13edAZIUnDKuYHUcTiS98OpET+eAJAXnd7wejxNJL7y+nZWHWEqS8ml8iPePr1g6IVSTBTRzFkhSUDZyODPicjLpdF5nG12SFJwfxCe60guvq5wDkhSYZ7k/TqeT+rJhO2Zn4fnLkqT8WUIXVsbphFKPoSuNLkkKzLXxiq7UO69iZtPOeSBJAXmci+J2SqmG1xm85DyQpICsoDPL4nZSqS4BullDksJyXfyiK9XOqxkLqOlMkKRg/Jtz43haqXVeFxhdkhSQVXw/nieWWnhd7EyQpIDczOJ4nlgqy4Ztmes9DSUpGOM4Jg6PP8m087rI6JKkYJRxbVyjK9XwkiSF4n95L74nV/1e6gA+di5IUiCW0Skej53MtPP6hnNBkoJxY5yjK5XOazKHOBskKQijOJ5ywwsO40NngyQFoYxjGBfvU6zusuGFzgZJCsTDcY+u6ndeMznQ+SBJAdhMJ+bF/SSr13n1MLokKRC3xz+6qhte5zkbJCkIy/hjEk6zeuE1wPkgSUG4hXVJOM3qXPPqwAzngyQFYAqHscPO61NnOR8kKZC+a0cyTrQ64eWioSSFYBLPJuVU97xs2Jil1HBOSFLkncOQpJzqnjuvfkaXJAXgfZ5LzsnuObxcNJSkENwS77sZft2elg1LWUZD54QkRdw4jk5SeO2p8+pjdElSAH6ZpOjac3i5TV6SQui7hibrhPcUXv2dE5IUeX9I2glXfc2rC5OcE5IUcR/TiZ12Xl/q65yQpMj776RF157C62TnhCRF3FIGJ++kqwqvGhzvrJCkiPsLm5N30lVd8zqW0c4KSYq09ezLGjuvr3LRUJKi7r4kRpfhJUkhK+fuZJ545eFVlx7OC0mKtGFMN7y+7jhqOS8kKdLuSuqJVx5eLhpKUrTN5SXDy/CSpND6rp1JPfXKtso3YVk1nvUlSSqUzbRlpZ3X151gdElSpD2V3OiqKrwkSVH2QJJPvrLw6uW8kKQIm8Mbhteu6nGoM0OSIuxflBleuzqaGs4MSYqs8iTeSX7P4XWsM0OSImwksw2v3fV0ZkhShD2Q9AIUVfjvltPEuSFJEbWelmyy89pVR6NLkiLsuaRHV8Xh5aKhJEXZk5bA8JKksKxnqEWoKLzcayhJ0fVvtliE3cOrIQdbFkmKLBcNKwyvHt6SV5Iiax3DLUJF4XWURZGkyHLRsJLw6mZRJCnC4SUq+pDyLPa3LJIUSVtpxnrLsHvn1YD2FkWSIup1o6vi8Ope4Q2jJElR8IIlqDi8ulkSSYqsFy1BxeF1mCWRpIiaxCcWwc5LksLiomEl4VXKIZZEkiLqFUtQcXgdQi1LIkmRtIl3LULF4dXdgkhSRI1iq0WoOLzcriFJUTXSElQWXt0siCRF1AhL8KWvfyR5BU0siSRF0FqasNMyVNR5NTO6JCmi3jC6KguvjpZDkiLKK16GlyQFZ7QlMLwkKSxbmGARDC9JCss4tlkEw0uSwvKOJagsvEp9grIkRdQYS1BZeO1PqeWQpEjyroaVhpeLhpIUTXNZaBEML0kKy3hLYHhJUmg+tASGlySFxs94GV6SFJyJlmBXn99Vfi/WWwxJiqA1NKbcMlTcee1rKSQpkiYYXYaXJIUXXjK8JCkwkyyB4SVJoZlmCQwvSQrNDEtQeXi1sxSSFEFrWWYR7LwkKSzTLUHl4VVCG0shSRHkomEV4dXKx6FIUiTNtASVh5eLhpJk52V4SZKyYrYlqDy83GsoSdE01xJUHl77WAhJiqBtLLcIlYdXCwshSRG0gDKLUHl4NbcQkhRB8y2B4SVJ4XVeMrwkyc4rPuFVg0YWQpLsvMIKr2Zf3OFQkhQl3pS3ivBy0VCSommFJTC8JMnwilF4+SkvSTK87LwkSVmx0hJUHl7NLIMkRdBatlkEOy9Jsu+y85Ik5dRqS1BVeDW1DJIUQRstQVXh1cAySJLhZXhJkgwvw0uSEmiDJag8vIrYyzJIkp1XWOFVjxLLIEmGV1jhVd8iSFIkbbIElYeXV7wkKZq8v4bhJUnBKbMEhpckhWanJTC8JMnOK0bh5YYNSbLzsvOSJNl5GV6SZOelXcKrnkWQJIUWXjUtgiRFkn8/VxFepRZBkgwvOy9JkuFleEmS4SXDS5JCUMsSVB5eXvOSJDsvOy9Jkp2X4SVJyeTncKsIL5cNJSma9rYEdl6SZHgZXpIkw8vwkiQZXtUOL695SZLhFVx41bAIkhRJPrKqivAqtwiSFEml7GURKgsvn9QpSVHVwhIYXpJkeBlekqQca2kJKguvnRZBkgwvOy9JUna4bGh4SZKdV3zCy2VDSTK87LwkSVnSxhIYXpIUmv0sgeElSaFpQn2LYHhJkr2X4SVJMrwKE17uNpQkwyu48NpqESQpstpZgorDa5NFkKTIOsASGF6SFJpOlsDwkqTwOq9Si1BReG22CJIUWaUuHBpekhSegy1BReHlsqEkGV6GlyQpi9yyUWF4bbQIkhRhh1iCisLLa16SFGWd3W9oeElSaGrT0SLsHl5e85KkaOtuCQwvSTK8DC9JUo4dbgl2D68NFkGSIq0bRRZh1/BabREkKdL2Zn+LsGt4rfFZypIUcUdagl3Dq4y1lkGSIu1YS7BreMEqyyBJhldo4eVVL0mKtm7sZRHsvCQpLDU4yiLYeUlSaFw4tPOSJMPLzkuSlGs9KbYIdl6SFJZGdLMIdl6SFJqTLYGdlyQZXnZekqQcO45aFsHOS5LCUpceFuGr4bXMMkhSAFw4/Fp4LWeHhZAkwyscnz7gbCGtLYUkRdxOWrDSMnzeecFiCyFJkVfC6RbB8JKk0PS3BIaXJIXmDEotguElSWHZm14WwfCSpNC4cGh4SZLhFXJ4LbEQkhSEjhxsET4Pr0UWQpICMcgSfP4h5Zps+ex/SZKi7SMOtQifdl7b/My2JAWiiwuHfPFYaa96SVIoXDj8Iry86iVJoRhoCT4Pr3mWQpICcagLh5+H1yfOBkkKxoWG16fmOBckKRiXJ32HuOElSeHZj96GF7hsKEmh9V6JVvTF/99IHWeDJAViHa3YZOdV7n5DSQpIA85J8ukXf/G/XDiUpJAkeuHQ8JKkMJ3MvoYXzHUmSFJASrja8LLzkqTQfJtSw2uO80CSgtKSswwvOy9JCs13k3riX73ByHr2ciZIUkDK6cSMZHde9l6SFF4Dck0yT/yr4TXDeSBJgbmCukkPr2nOAkkKTJNkflj5q+E13VkgScH54df+JrfzkiQFoAP9k955lTsLJCnA3ivR4bWOxc4BSQrOCRyV5PBy4VCSwnS94SVJCs0FtEtyePlJL0kKUSk/tfOSJIXmKtoYXpKksNTix0k63aJd/mk99ZwDkhSgTbRnWTI7r3JmOv6SFKS6Sfq81643FXHhUJJCdS2NkxpeUx19SQpU/eRc99o1vCY6+pIUrOtpmczwmuDYS1Kw6vGLZJxo0W7/vIqGjr8kBWo7nZidvM6rnEmOvSQFq5RfJ+E0d3+EmQuHkhSyb9LV8JIkhfb3+m8ML0lSaM6hb9xPsWi3f1OH9ZQ49pIUsA85kp3J6rw2e4soSQpcN66I9wkWV/DvXDiUpND9jgZxPr2KFgg7cLLjLklBq0c5I+y8JElh+TEHGF6SpLDU4g/xPbmiCv/tUpo77pIUvAG8kJzOy3vLS1I83EGdeJ5YxZ/o6sRxjrkkBa8R5YxMTuf1niMuSbHwUw5OTni963hLUizU5O5KdjfEMLyWMN8Rl6RYOJ5vJCW87L0kKT7+QoukhJdXvSQpLprwV8NLkhSaQQyM1wlVdhmvHmuo4XhLUkysoDPL4t95bWSqYy1JsdGUP8fpdIor/S9u2ZCkOLmEc5MQXl71kqR4+TvNDC9JUlha8mBcPrBceXh9xAZHWpJi5QyuiXt47eR9x1mSYuZ2OsU7vNyyIUnxU5eHqRn+aZRUeYoXOc6SFDOtKeW10E+iqkt3jVleZWcmSQpRGaeGHl9VhdMqJjvGkhQ7xTxKm/iGF7zlGEtSDDXn0bBvAVhS5X9tELdbOUqSAGhHzZCXDqv+uForFjnCkhRL5ZzLkHiGF8zkQEdYkmJpNUfwSZiHvqfdhG86upIUU414jNrxDC+3bEhSfB3NP8I88JI9/Pf1/MDRlaTY6sp63gnvsPd8f+F5tHV0JSm2dnIWL4V20Hu+g8YoR1aSYqyEh+kQv/DyqpckxVsjnmPvuIWX+w0lKe468cge90AEFl5TWOG4SlLMnclfQzrc6iTtUXR2XCUp5o5iI2/HKbwaMsBRlaTYO4WPmRTGoRZV43vaMccxlaQE2EJfRsclvLzDoSQlxUp6MT36h1m9JyUPczwlKRGa8BKt4xJewx1PSUqI/RlGk6gfZPWWDRuwglJHVJIS4j36sj78zmsd4xxLSUqMoxkS7YelFFfz+1w4lKQkOZHHqRF+eLllQ5KS5Sz+We2MyLuian5fDVaEdttGSVKGHuBqyqJ4YNW9EWMZPenoOEpSonSnLS9QHm54QVP6OY6SZHxFQfXXM92yIUlJ9C3+Eb1rX0UpfO9c9nUUJSmB/sF3o3XtK5WHj3XiSEdQkhLoCNpFa/EwlVbwBcdPkhLqCp6J0seWU1k2rMMK6jqCkpRQIzk7KjeNSqXz2sxrjp0kJdaJvBaVW/amtoPEhUNJSrKjeDMaD0wpSum7W7MgxZ+QJMXLTM5gVlid1yLed9wkKdE68C69wwovFw4lSU0YzgWFPYSSFL9/A9c4bpKUcDUYyGZGF+4AilL+/vm0cdwkSdzJDwt1342SlH+iE0c4YpIkjuFQXmR7Id469ZstetVLkvSp83ib9oV449Q3vnufDUnSl1ZyASPy/aapLxvuoBcdHC1JEgB1+Qbb8r15oySNn2lAf0dLkvSZYvrShqHszN9bpnO/jDbMi96DySRJBTWKC1mUv7xM3ULecZQkSV/Tmw85LV9vVpLWT+2dvwOUJAWiHt+gDiPz8dDK9G6zuw/zvEGvJKkCI7mEJbl+k/SuXS3gPcdHklSBE5nAybl+k5I0f64RpzhCkqQK1OMSihidy1tHpbv4tx+zXTiUJFXqPb7JzFy9eLpb3uf4ZC9JUhWOZnzunkNSkvZPNsn9mqYkKWC1GEBXXmNz9l86/aW/DsxwZCRJe7CIbzE02y+a/p0yZjLBMZEk7UFrXuEJmkQlvOBpx0SSVA2D+Ijzs/mCmewY7Mg0R0SSVE1Pci3LC995TWeyYyFJqnb/NT1b+w9LMvrp5pzgaEiSqqkOAziesawobHgt5/uOhSQpBe25mpqMYUcmL5LpXTI+5DBHQpKUogX8gocK1XlBfe9xKElKWQPO5UjGsKYwnZdPVZYkpWszf+Y21ue/81pPH9pbf0lSGko5jmvYyvhU70BfkvFb1+Bs6y9JSlNdTudCljIllR/K/LEmDVhCHasvScrICH7CB9X95syvV63jRWsuScrQSYznebrmK7zgEWsuScpYEf35gCc4qDrfmrmaLMr2/YIlSYlVxtP8jFlVfUtJFt5mJ/tzpNWWJGWpA+vMd2nNJNZW9i3Z+YyWC4eSpGyqyff4hOc5orJ8y05KzvLTXpKkHBjNH3h+139ZkqUXb8FxVliSlHX7cjED2MIkyrPdecEhPttLkpRDU/kbD7Ehu+EF79Pd2kqScmgtD3IXM7K3bAil9LOukqQcqs0xXEcP1mSv82rMQmpbWUlS7mWv89pMZw61oJKk3Mvms7jus5ySpDzYXpTFFytiJgdYU0lSjj2Tzc6rnAetqCQp5+4ryurL7cOcLF5FkyRpdwtpV5zVF1zAcKsqScqpB9hZnOWXdNOGJCmXyvlXNu+w8amazKe5tZUk5chr9M3uVnmAbTxsZSVJOXMfZL/zgk5MtbaSpJxYRRu2ZL/zgmmMsbqSpJx4mC2Qi/By04YkKVce+PT/FeXgpeuziL2ssCQpy8Zy9Kf/Ixed13oescKSpKz7YmWvKCcv35lJOXplSVJSbaY1a3LXecFkRlllSVJWPf55dOUqvOAuqyxJyqp7vvyfuVrcK+UT2lhpSVKWTOSwL/8hV53XdjfMS5Ky6H+/+g+521bRirmUWm1JUhZsoA3rct95wWKGWG1JUlY8+tXoymV4uWlDkpQt9379H3P7aayJHGrFJUkZeo9jvv4vinP6dvdYcUlS9tMkt51XfRbQwKpLkjKwljZszGfntd5HU0qSMvTQrtFFzu9AeDCTvcuhJCkDh/LRrv+qOMdvOZU3rLskKW2jdo+u3IcX3GHlJUlpq3DrX+6X9IqZQkerL0lKw0r2YUshOq8y/mr1JUlp+VdF0UVeNlPUYx6NHQFJUorK6cSMiv5DcR7efCN3OwKSpJQNrTi6yNM29hbMobajIElKyZm8VPF/KM7L2y/lccdAkpSSWbxS2X8qztMh/A/ljoMkKQV3UVbZf8rf3S+GcYojIUmqpk20ZVWhOy+43ZGQJFXbQ5VHF3m97+AEujoakqRqOYyJlf/H4jweiDeKkiRVz8iqoiu/4fUIix0PSVI1/K3q/1ySx0PZSV1OdEQkSXswj2sr32mY784L7tr9gWKSJO3ibnZEp/OCzbTmaEdFklSFLVzKpqq/pTjPh/QHtjkukqQqPMbyPX1LSZ4PaR0H0M2RkSRV6tss2tO3FOX9oA5kWt4jU5IUinc4ds/fVJz3w/qYpx0bSVIl7qzONxUV4MAO44OCvK8kKeoWsD/bo9h5wQRedHwkSRW4ozrRRYE6oGMY4whJknaxnn1ZU51vLC7I4b3LSMdIkrSLf1YvuijYtaeTedVRkiR9xU4OYnb1vrW4QIf4Gm87TpKkr3imutFVuPCC2xwnSdJX/Ln631q4LetFjONwx0qSBMDYVO59W7jOq5w/OlaSpM/8d2r9T+GUMJmOjpckiTl02NNjUKLRecFOfu94SZKAO1OJLgp8m6YSPqKTYyZJCbeOfVmbyg8UF/Rwd/Jbx0ySEu/e1KKLgt8gt5gP6Oq4SVKC7eAA5qUaHoVVZu8lSQn3dKrRRQQeTVLEeLo7dpKUWEcxLtUfKS74QZfza0dOkhJrWOrRRUQeCjmGYxw/SUqkE3k99R8qjsSh23tJUjK9l050RSW8hvKmIyhJCfS79H6sKCKHf5zxJUmJM5UulIXbecFbPltZkhLn9+lFV3Q6LziW0Y6jJCXIfA5ge3o/WhyZk3iboY6kJCXIH9ONrih1XnAEYyN1PJKk3FlGezal+8PFETqR8QxxNCUpIe5MP7qIWKfTkY+o4YhKUuytZ1/WpP/jxZE6menc54hKUgL8bybRReSuMTXnY+o7qpIUa1vZn0WZvEBxxE5oGX92VCUp5h7ILLqI4O6++nxMc0dWkmJrB52YldlLFEfupNb7eEpJirXBmUYXkfxcVQ0mcrCjK0mxtJNDmJHpixRH8MR2cIujK0kx9VDm0UVk72gxmmMdYUmy7wqn8wL4CeWOsSTFzuBsRBeURPT0FtCdTo6yJMWs77qYldl4oeLInuJN7HCcJcm+K6TOC1ayD0c40pJk37W7KD+CpBUzqedoS1JM/Isrs/VSJRE+zQ3Uoo+jLUmxsIMLWZWtF4v2wx/rMJV2jrgk2XeF03nBDpZyviMuScHL4vUuiPJuw0/9H2865pIUvKztM/xUUeRPuDtjI94fSpL21Hcdkt3wKo78KX/AA467JAXt4exGVwidFzRnBns79pIUqO0cnPlDUL4uhAW5jWznVEdfkgL1dx7N9ksWBXHipUyio+MvSQHayIEsyfaLFgdx6tv5seMvSUG6PfvRFUrnBfAi/ZwDkhSYlRzA2uy/bHEwBbierc4CSQrM73MRXQT0CapVNKKn80CSArKQy3LzeKuigIrQgOm0dC5IUjCu4v7cvHBI967YyjoGOBckKRDT+Q5luXnpoqAKUcy7HOl8kKQgDOTpXL10UWClOIJ3vdOhJAVgLMdQnqsXDy0IFtOco50TkhR5lzM7dy9eFFw5GjCV1s4KSYq0oZyey5cPbwluK0t8QKUkRVo5F7E4l29QHGBRHuVVZ4YkRdgTjM/tGxQFWZaDmEgtZ4ckRdI2ujAzt28R5s69ldSkj/NDkiLpLzyW67coCrQ0tZjIQc4QSYqcVXRgVa7fpDjQ4mzl/zlDJCmCfpX76Aq38wJ4gkHOEkmKlKl0zc2teOMTXi2Zxt7OFEmKkDN4JR9vE/KtljawJbcfgpMkpeRlfpOfNyoKukwljKW7s0WSImEH3fkoP29VHHShdubudvuSpBTdna/oIvg7tC+imTfqlaQIWMP5bMrXmxUHX66bc3nfYklSNf2WFfl7s6IYFOwkXo3FeUhSuGbRma35e7s4PNjxE9rTzZkjSQV0JVPy+Xbx6Fj2ZjJtnDuSVCAjOSm/b1gSi7JtZR4XOHskqSDKuCC3T+/aXXFMSvcUzzh/JKkg/pHrp3ftLj4bHVoymcbOIUnKs5V0yuc+w3h1XrCEHzuHJCnvfpL/6CJmW8xf4TTnkSTl0SiOp9zwykw7JlHfuSRJebKDI5lQiDcuiVUZ17KBM5xNkpQnf2ZwYd44bnemKOYNejufJCkPFnMwawv1l328lHE1W5xRkpQH1xcquuK2bAiwkjJOdk5JUo4N42eFe/M43tC2Bm/Rw3klSTm0ja5ML9zbF8ewpDv4JhucWZKUQ7cVMrriuGwIsJr19HNuSVKOzOUSthte2TeWo+ng/JKknLiUyYU9gPg+xLENE73XoSTlwDOcX+hDKIltcdeziPOcY5KUZRs5q3Bb5OMfXjCRQ+jsPJOkrPopwwp/EEWxLnFTJtHSmSZJWTOG3uws/GEUx7rIK7iiEHc7lqSY2spVUYiueC8bAsxiHw53vklSVtzCs9E4kKLYl7oeH3KgM06SMjaBowr76a4vFce+2Bu5IhpNriQFbQdXRSW64r9sCDCfBhzrvJOkjPyeR6JzMEWJKHktxnKoM0+S0jadblF64FRxIoq+lcvY6tyTpDSVcWW0npVYkpDCL2EDpzv/JCktf+G+aB1QUWJKX8QQBjgDJSllczg0ag+aKkpQ+ZsxgVbOQklKSTmnMTxqB1WcoAFYziVumpekFP0jetGVnGten7e+dentTJSkalvEudHaqvGpooQNQymjONrZKEnVUk5/XorigRUnbCC2czHrnI+SVC33RjO6krZsCLCa2QxyRkrSHs3mfLYZXlExmf05zFkpSVUq41xmRvXgihM5JN9nuvNSkqp0G29G9+CKEjooR/A2NZ2bklSJDzkmqkuGkMxlQ4DFbOFUZ6ckVWgr/Vgc5QMsSezQvEMPH1IpSRW6iSHRPsCiBA9OCz6kpXNUknYxjNMpN7yiqw+vUsN5KklfsZzDor1kCEleNgSYy3b6OlMl6QvlXML46B9mScKHaTRdOdjZKkmfuYu/hHCYRYkfqIaMZ3/nqyQBUziSzSEcaHHih2oN54UxVJKUY1u5JJS/D0scLZaygv6WQVLi/ZDnQzlUwwtgPO3pZhkkJdrz/Cicg/Wa16fq8LbxJSnB5tGdVeEcrte8PrWZC3zOl6TE2s5FIUWX4fWlmXzbIkhKqJ/yTlgH7DWvL02mCcdYBkmJ8yLXh3bIXvP6qlJG0ssySEqU+XRnpeEVtn0ZT1PLICkxttGHMeEdtte8vm4el1JmGSQlxo9DjC6vee3uY3ZwsmWQlAiPcVOYB2547W4UnehiGSTF3nTOYluYh+41r4rUYRSHWwZJsbaBo5ka6sF7zasimzmP5ZZBUoyV861wo8vwqsxcLmaHZZAUW3/iyZAP32telfmE9ZxuGSTF0kiuCHtnteFVuTG09cqXpBiay6lsCPsU3LBRldq8wdGWQVKsbOY4xod+El7zqsoWzmGhZZAUI+V8K/zoMrz2ZDGD2GoZJMXGbTwWh9PwmteeLGA+51gGSbEwjKspN7ySYQItOMoySAreDE5jczxOxQ0b1VHKcPpYBklBW00PZsTlZAyv6mnOONpaBknB2s7pjIjP6bhho3qWcQZrLYOkYP0gTtFleFXfZC5mp2WQFKQ/c3e8TsgNG9X3Meu8YZSkAL3ClfHYY2h4pWcMzbzjhqTATOGMuOwx/JIbNlJTg+ftviQFZAk9mBu/0zK8UlWfUXS1DJKCsImTGRPHE3PDRqrW08/7HUoKwk4uiWd0GV7pWMjZbLQMkiLveobE9dQMr3SM5/KwH+MmKQF+x13xPTl3G6ZnKts52TJIiqzHuDbOp2d4pWsU+9LdMkiKpBEMjPdtFdxtmL5SXrb7khRBkzieNfE+RcMrEw14m86WQVKkzKYXS+J+koZXZg5gDE0tg6TIWEJvZsX/NN1tmJlZ9HPbvKTIWEe/JESX4ZW5sVzIDssgKQK2MIAPknGq7jbM3Ew+4VwXYCUV2E4u4ZWknKzhlQ0T2clJlkFSAZVzNY8m53QNr+x4k8YcYxkkFcyN/D1Jp2t4ZcswOnOIZZBUED/jv5N1wl6pyZ6avOSHliUVwG/5ddJO2fDKpr15g8Msg6S8uoMbknfShld2teZt2lkGSXlzP1dTbngpU515i0aWQVJePMSVyXxAkx9SzrbJnMEmyyApDx7jqqQ+W9Dwyr53uch7bkjKuce5NLl/17hVPhdmsJQBlkFSTqPrm0n+Ndnwyo3xFHGCZZCUIw9zWbwfNml4Fcrr7MWxlkFSTrquy5MdXYZXLr3KPhxuGSTZdRleYXmBjnSxDJKyGl1XGl3uNsytMi7jBcsgKWv+l8vdzWx45d52zmeoZZCUFX/g+0n9XNeuvMNG7tVlKL0tg6SMo+tmi2B45dPejHDrhqQMlPMTbrcMhle+teBNDrIMktJSxve41zIYXoWwD2+xn2WQlLJtXM5jlsHwKpQDeZNWlkFSSjYykFcsg+FVSF14nSaWQVK1raI/71gGw6vQujGShpZBUrUs4nQmWYaK+Dmv/PqQM9loGSRVw1R6GF12XtFxPP/2WcuJsYFFLGMZK1jLGtawljVsZT07WMdO1nzt8e2l7AVAA+pQj0bUox6NaPLZV1NaUdeCJsZabuUhVlkIwytKDuYldx7G0kZmMY95zGM+81jAUjZn9fUb0po2tGJf9qM97WlLDYseS8s4nQ8sg+EVPS15gSMsQwyU8wkfMYOZzGQmC/L87jVoSwc6cTAdOZiWDkdMzONUplsGwyua9uJx+lmGQK3hfSYwmYlMZUNkjqoR3TmcIzicDv7JDtg0TmW+ZTC8oqsGf+fbliEgGxjPOMYxno+/dq0qehp8EWMd3ZQVmPc5neWWwfCKul/wH45B5M1lNO8wmkkBPopiL7rRiz70pr4DGYCXuDBCvbzhpSpcyj+paRkiaSavM5I3WBSLPv9wTqAPxxliEXYX1/uYScMrHCfxDHtbhghZyDBGMjLv2y/yFWJ96MNxNHCgI2UnP+EvlsHwCsshDOFAy1BwW3mLoQxNxMdCSzia/vSnq8MeCRv5BkMsg+EVnsY8ximWoWAW8zzPMzKBdz9pR38GcAK1nAQFNJ9zGW8ZDK9QfxP+L26yDHk3mxd4krcT/mj1upxMf/rT2glRAG9yAUstg+EVssu5m9qWIU8m8xiP8bGF+EIxR3MWF3CApcibcv6Hnwe4i9Xw0i668xT7W4Ycm8e/eZJRFqISnbmUS+3C8mAD3+JJy2B4xUMjHqK/ZciRhTzBY7xnIarRhfXhEs6jsaXImSkMYoplUJx+obiJHZT7ldWvVTzEAG9jm6IS+vIQ65w/Ofh6iHpOMMXPSSz0j3eWvrbzLGdS6qRKWz0u5mV2Opey9rWSc51WiqumPOcf8oy/5nMb+zqZsqINN/GJcyoLXyPZx+mkeC8f/j82+0c9za+tPMEp3pQ268uI/RnCdudX2l+buZkSJ5LiryuT/AOf8td0bqS5kydnWvNLZjvP0vgaTSenj5KilFvdvlHtry08QV/30OZBMX15iE3OuWp/beImey4lTQ+m+Yd/j1+zuZEmTpa8asHPmePcq8bXcNo7XZREdbjd/qvSr528TH+vbxVICWfxinsRq9w2dJHTREnWjff8i2C3r7XcwyFOjoI7gNtY7nzc7Wsbd/gENakGP2KDfyF88fUuV/lBz0itD1zpL1hf+3qRDk4L6VPteMa/FFjN3zjMyRBJR3E/652jjOM0J4P0dScyIdF/KVxjvxVxtRnE8wn+PNg0LvMarFTxAuL3WZG4vxIW8kevbwWkLT9P4D7Z+VztPTSlqjTi92xMzGdkHuV0PyUTpB78nVUJmaczuNpnUkvV0ZK/sTXWfx2U8SZXs7dDHbRaDOQ5tsR6pr7PBf56JaViP+5nWyz/OhjPT7ytbow04GKejOF+2Z28zOkOr5ReB3ZbrP5SmMKtdHRYY6k2A7iHpTGZqWv8nKGUqWb8Rww2cXzIrXR1MGOvlFO5hyVBL2iP5nJqO5RSNtThSsYH+VfBDt7kR+zvECZKMcfxe96nLLjnFtzCAQ6flG09eTig+32v4Umu8hEmidaCy3iUZUFshL+Dox0wKXcacBnDI/4b7SzuoC81HSx9Zn+u4YmILn5P5jZ6+7id6HAo4q093+A8ukfsqD7hdUbyGoscIFWgmEPpTQ96cGAEjmY5rzOCl5jnwBheyrf9OIdz6VXwT6HM4U1G8jpzHBJVS3OO4Ri6051WeX/vpbzLCEYyiXIHwvBSITXmRE6mb97vc72JcYzhHcawxEFQmlrQnW4cSkc65fTOlqt4n7GMYyzzLbrhpWjZlz4czTF0ozSH77KSD5nIBCbwETssurL4d9a+dKQj+9OO/WhH4wxfbwvzmMtUpjKNySy3wIaXoq4W3elOZw6mMy2y8Ho7mcdMZjKDGUxioQVWXjSgDc1oQQua0YxG1GMvGrA3xdT8So+2ge3sYD1bWcVKVrGKlSxkPguMK8NLIWvMQbSlLfvSltY0ojGNqrwz9jZWs5rVLGcei1nAAhYyh60WUlJ+/H8Px9SVIf+cmgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0zMVQwNTo1NDowMiswMDowMMOo5n0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMzFUMDU6NTQ6MDIrMDA6MDCy9V7BAAAAAElFTkSuQmCC',
  live: false, // If current time is inside any presentation ranges (HARD)
  website: 'https://apple.com.au',
  opportunities: [
    // List of opportunities for that company
    {
      id: '111',
      type: 'Internship', // Type of Role Grad/Intern
      role: 'Software Engineering Internship', // Name of role
      location: 'Sydney', // Physical Location or Remote
      wam: 'Credit', // wam requirement otherwise null
      expiry: new Date(
        new Date().getTime() + 6 * 24 * 60 * 60 * 1000
      ).getTime(), // When the opportunity expires
      link: 'https://www.apple.com.au/careers', // Link to opportunity page
      description: 'Description of the Apple intern role',
    },
    {
      id: '222',
      type: 'Graduate',
      role: 'Software Engineering Graduate',
      location: 'Sydney',
      wam: null,
      expiry: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).getTime(),
      link: 'https://www.apple.com.au/careers',
      description: 'Description of the Apple Grad role',
    },
  ],
  events: [
    // List of presentation events for that company
    {
      id: '111',
      title: 'Apple Presentation', // Presentation Title
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        14,
        0
      ), // Start Date of presentation in epoch time
      end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        15,
        0
      ), // Start Date of presentation in epoch time
      description: 'Description of the Apple Presentation event',
      link: 'https://www.zoom.com/apple-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(50,50,50)', // color of the Dot
    },
  ],
  qandas: [
    // List of all questions and answers
    {
      id: '222',
      question: 'Will the internship give any freebies?', // Question posted by a student
      answer: 'Freebies will be shipped from San Fran HQ', // Answer posted by the company
      creatorId: '0'
    },
    {
      id: '111',
      question: 'Will Covid be a factor in the hiring process?',
      answer: '',
      creatorId: '1'
    },
  ],
};

const companyStallData3 = {
  fairID: '1234',
  company: 'Canva', // Name of Company
  title: 'Canva Virtual Fair', // Name of stall
  description: 'Canva is a graphic design company',
  logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png',
  live: true, // If current time is inside any presentation ranges (HARD)
  website: 'https://canva.com',
  opportunities: [
    // List of opportunities for that company
    {
      id: '111',
      type: 'Graduate', // Type of Role Grad/Intern
      role: 'Mobile Engineer Graduate', // Name of role
      location: 'Remote', // Physical Location or Remote
      wam: 'High Distinction', // wam requirement otherwise null
      expiry: new Date(
        new Date().getTime() + 11 * 24 * 60 * 60 * 1000
      ).getTime(), // When the opportunity expires
      link: 'https://www.canva.com/careers', // Link to opportunity page
      description: 'Description of the Mobile Grad canva role',
    },
    {
      id: '222',
      type: 'Graduate',
      role: 'Software Engineer Graduate',
      location: 'Remote',
      wam: null,
      expiry: new Date(
        new Date().getTime() + 10 * 24 * 60 * 60 * 1000
      ).getTime(),
      link: 'https://www.canva.com/careers',
      description: 'Description of the canva Mobile Grad role',
    },
    {
      id: '333',
      type: 'Internship',
      role: 'Software Engineer Internship',
      location: 'Remote',
      wam: 'Credit',
      expiry: new Date(
        new Date().getTime() + 10 * 24 * 60 * 60 * 1000
      ).getTime(),
      link: 'https://www.canva.com/careers',
      description: 'Description of the canva Software Engineering Internship',
    },
  ],
  events: [
    // List of presentation events for that company
    {
      id: '111',
      title: 'canva Internship Presentation', // Presentation Title
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        14,
        0
      ), // Start Date of presentation in epoch time
      end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        15,
        0
      ), // Start Date of presentation in epoch time
      description: 'Description of the canva Intern Presentation event',
      link: 'https://www.zoom.com/canva-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(35,191,200)',
    },
    {
      id: '222',
      title: 'canva Graduate Presentation', // Presentation Title
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        15,
        0
      ), // Start Date of presentation in epoch time
      end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(
        16,
        0
      ), // Start Date of presentation in epoch time
      description: 'Description of the canva Grad Presentation event',
      link: 'https://www.zoom.com/canva-id-link', // Zoom/YouTube/etc link to Presentation
      color: 'rgb(35,191,200)',
    },
  ],
  qandas: [
    // List of all questions and answers
    {
      id: '222',
      question: 'Will the internship give any freebies?', // Question posted by a student
      answer: 'Freebies will be shipped from San Fran HQ', // Answer posted by the company
      creatorId: '0'
    },
    {
      id: '111',
      question: 'Will Covid be a factor in the hiring process?',
      answer: '',
      creatorId: '1'
    },
  ],
};
