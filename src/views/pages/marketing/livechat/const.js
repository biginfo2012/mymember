export const viewlistItems = [
    'Your open tickets',
    'Unassigned work order',
    'All open tickets',
    'Recently updated tickets',
    'open ticket',
    'Recently resolved ticket',
    'Aborted work order',
    'Ticket deleted',
]

export const ticketStatusList = [
    'any',
    'new build',
    'activated',
    'unactivated',
    'unsolved',
    'solved',
    'closed'
]

export const dateRangeList = [
    'any',
    'in the last 24 hours',
    'in the last 7 days',
    'in the last 30 days',
    'in the last 3 months',
    'in the last 6 months',
    'within last year',
    'over a year ago',
]

export const priorityList = [
    'any',
    'Low',
    'Normal',
    'High',
    'Urgent'
]

export const headCells = [
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Title',
    },
    {
      id: 'requester',
      numeric: true,
      disablePadding: true,
      label: 'Requester',
    },
    {
      id: 'request_date',
      numeric: true,
      disablePadding: true,
      label: 'Request Date',
    },
    {
      id: 'Type',
      numeric: true,
      disablePadding: true,
      label: 'Type',
    },
    {
      id: 'priority',
      numeric: true,
      disablePadding: true,
      label: 'Priority',
    },
  ];


export const mockUsers = [
    'Peter Wilkins',
    'Monu',
    'Xing Liao',
]


export const mockMsgs = [
  {
    msg: 'Hello, how may I help you',
    isSend: true,
  },
  {
    msg: 'Welcome to our site',
    isSend: false,
  }
]