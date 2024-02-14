import { useEffect, useState } from "react";

export const usersData = [
    {
        id: '1',
        name: '  ',
        email: 'eileen_h@hotmail.com',
        img: '/img/avatars/thumb-1.jpg',
    },
    {
        id: '2',
        name: 'Terrance Moreno',
        email: 'terrance_moreno@infotech.io',
        img: '/img/avatars/thumb-2.jpg',
    },
    {
        id: '3',
        name: 'Ron Vargas',
        email: 'ronnie_vergas@infotech.io',
        img: '/img/avatars/thumb-3.jpg',
    },
    {
        id: '4',
        name: 'Luke Cook',
        email: 'cookie_lukie@hotmail.com',
        img: '/img/avatars/thumb-4.jpg',
    },
    {
        id: '5',
        name: 'Joyce Freeman',
        email: 'joyce991@infotech.io',
        img: '/img/avatars/thumb-5.jpg',
    },
    {
        id: '6',
        name: 'Samantha Phillips',
        email: 'samanthaphil@infotech.io',
        img: '/img/avatars/thumb-6.jpg',
    },
    {
        id: '7',
        name: 'Tara Fletcher',
        email: 'taratarara@imaze.edu.du',
        img: '/img/avatars/thumb-7.jpg',
    },
    {
        id: '8',
        name: 'Frederick Adams',
        email: 'iamfred@imaze.infotech.io',
        img: '/img/avatars/thumb-8.jpg',
    },
    {
        id: '9',
        name: 'Carolyn Hanson',
        email: 'carolyn_h@gmail.com',
        img: '/img/avatars/thumb-9.jpg',
    },
    {
        id: '10',
        name: 'Brittany Hale',
        email: 'brittany1134@gmail.com',
        img: '/img/avatars/thumb-10.jpg',
    },
    {
        id: '11',
        name: 'Lloyd Obrien',
        email: 'handsome-obrien@hotmail.com',
        img: '/img/avatars/thumb-11.jpg',
    },
    {
        id: '12',
        name: 'Gabriella May',
        email: 'maymaymay12@infotech.io',
        img: '/img/avatars/thumb-12.jpg',
    },
    {
        id: '13',
        name: 'Lee Wheeler',
        email: 'lee_wheeler@infotech.io',
        img: '/img/avatars/thumb-13.jpg',
    },
    {
        id: '14',
        name: 'Gail Barnes',
        email: 'gailby0116@infotech.io',
        img: '/img/avatars/thumb-14.jpg',
    },
    {
        id: '15',
        name: 'Ella Robinson',
        email: 'ella_robinson@infotech.io',
        img: '/img/avatars/thumb-15.jpg',
    },
]
// const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/project?id=65c32e19e0f36d8e1f30955c');
// const jsonData = await response.json();
// console.log(jsonData.data.projects);
// export const userDetailData =jsonData.data.projects
// console.log(userDetailData);

// export const userDetailData = [
//     {
//         "_id": {
//           $oid: "65c32ee24c548ae2c6ffa33c"
//         },
//         project_name: "Y Project",
//         client: [
//           {
//             client_name: "Client X",
//             client_contact: "+91-1234567890",
//             client_email: "ab123@gmail.com"
//           }
//         ],
//         project_id: "COLP-441799",
//         project_type: "Residential",
//         description: "This is residential  project",
//         files: [
//           "https://interior-design1.s3.ap-south-1.amazonaws.com/441799/1707290337730Screenshot%202024-01-04%20114858.png"
//         ],
//         mom: [
//           {
//             mom_id: "COl-M-822588",
//             meetingdate: "01/02/2024",
//             source: " Online",
//             attendees: {
//               client_name: "Kushagra",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-822588/1707298405509Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-822588/1707298405516Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-822588/1707298405521Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-822588/1707298405528Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-968845",
//             meetingdate: "01/02/2024",
//             source: " Online",
//             attendees: {
//               client_name: "Sid",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-968845/1707298419399Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-968845/1707298419403Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-968845/1707298419407Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-968845/1707298419412Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-101530",
//             meetingdate: "01/02/2024",
//             source: " Online",
//             attendees: {
//               client_name: "Siddhant",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-101530/1707298440337Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-101530/1707298440345Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-101530/1707298440350Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-101530/1707298440357Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-892888",
//             meetingdate: "01/02/2024",
//             source: "In Office",
//             attendees: {
//               client_name: "Abhi",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-892888/1707298467596Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-892888/1707298467601Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-892888/1707298467605Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-892888/1707298467608Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-735109",
//             meetingdate: "02/02/2024",
//             source: "In Office",
//             attendees: {
//               client_name: "Abhi Singh",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-735109/1707298481611Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-735109/1707298481615Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-735109/1707298481619Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-735109/1707298481624Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-314182",
//             meetingdate: "02/02/2024",
//             source: "In Office",
//             attendees: {
//               client_name: "Abhi Singh",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-314182/1707298504393Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-314182/1707298504397Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-314182/1707298504401Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-314182/1707298504405Screenshot%202024-01-11%20145830.png"
//             ]
//           },
//           {
//             mom_id: "COl-M-848282",
//             meetingdate: "02/02/2024",
//             source: "In Office",
//             attendees: {
//               client_name: "Abhishek",
//               organisor: null,
//               architect: null,
//               consultant_name: "Naveen"
//             },
//             remark: "This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. \nIt allows requests from specified origins and defines the allowed methods.",
//             imaportant_note: "origin: An array containing the allowed origins for requests. In this case, requests are allowed from both \"http://localhost:5173\" and ",
//             files: [
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-848282/1707298513877Screenshot%202024-01-04%20114858.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-848282/1707298513882Screenshot%202024-01-09%20121252.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-848282/1707298513888Screenshot%202024-01-11%20141616.png",
//               "https://interior-design1.s3.ap-south-1.amazonaws.com/COLP-441799/COl-M-848282/1707298513895Screenshot%202024-01-11%20145830.png"
//             ]
//           }
//         ],
//         leadmanager: "Roj",
//         designers: [
//           {
//             junior_designer: [
//               {
//                 name: "Grecy",
//                 status: "working",
//                 id: 874925
//               }
//             ],
//             senior_designer: [
//               {
//                 name: "Daneil",
//                 status: "working",
//                 id: 670055
//               }
//             ]
//           }
//         ],
//         superviser: "Lady",
//         visualizer: "Evil",
//         project_status: "design",
//         project_start_date: {
//           $date: "2023-12-31T18:30:00.000Z"
//         },
//         timeline_date: {
//           $date: "2024-01-30T18:30:00.000Z"
//         },
//         project_end_date: {
//           $date: "2024-01-30T18:30:00.000Z"
//         },
//         project_budget: "50000 ₹",
//         project_location: "Delhi",
//         createdAt: {
//           $date: "2024-02-07T07:18:58.060Z"
//         },
//         __v: 0
//       }
      
// ]

const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/project?id=65c32e19e0f36d8e1f30955c');
const jsonData = await response.json();

export const userDetailData=jsonData.data.projects




// export const userDetailData = 
// [
//     {
//         id: "8",
//         name: "Devashish Gupta",
//         lead_id: "833500",
//         email: "Devashishgupta20102000@gmail.com",
//         phone: "+916389707199",
//         location: "delhi",
//         status: "Follow Up",
//         source: "Online",
//         notes: [
//           {
//             content: "this is candidate refered by arvind",
//             createdBy: "Admin",
//             _id: "65c35bd30bd5c3b0ec1ed5bc",
//             createdAt: "2024-02-07T10:30:43.883Z"
//           }
//         ],
//         createdAt: "2024-02-07T10:30:43.883Z",
//         __v: 0
//       },
//       {
//         id: "65c364b51ffbd8a3f13b3771",
//         name: "Ratnesh",
//         lead_id: "510161",
//         email: "ashish@gmail.com",
//         phone: "+91 1234567890",
//         location: "Delhi",
//         status: "cancel",
//         source: "website",
//         date: "07/02/2024",
//         notes: [
//           {
//             content: "this is lead management of crm",
//             createdBy: "ADMIN",
//             _id: "65c364b51ffbd8a3f13b3772",
//             createdAt: "2024-02-07T11:08:37.729Z"
//           },
//           {
//             content: "this is lead management of crm for hd bgfb bsdb bsd",
//             createdBy: "Client",
//             _id: "65c364ff1ffbd8a3f13b3779",
//             createdAt: "2024-02-07T11:09:51.919Z"
//           }
//         ],
//         createdAt: "2024-02-07T11:08:37.732Z",
//         __v: 0
//       }
   
// ]

// export const userDetailData = [
//     {
//         id: '1',
//         name: '  ',
//         email: 'carolyn_h@hotmail.com',
//         img: '/img/avatars/thumb-1.jpg',
//         role: 'Admin',
//         lastOnline: 1623430400,
//         status: 'active',
//         personalInfo: {
//             location: 'New York, US',
//             title: 'Product Manager',
//             birthday: '10/10/1992',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: '  ',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: '  ',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '2',
//         name: 'Terrance Moreno',
//         email: 'terrance_moreno@infotech.io',
//         img: '/img/avatars/thumb-2.jpg',
//         role: 'User',
//         lastOnline: 1632393600,
//         status: 'active',
//         personalInfo: {
//             location: 'New York, US',
//             title: 'Software Engineer',
//             birthday: '03/02/1984',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Terrance Moreno',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Terrance Moreno',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '3',
//         name: 'Ron Vargas',
//         email: 'ronnie_vergas@infotech.io',
//         img: '/img/avatars/thumb-3.jpg',
//         role: 'User',
//         lastOnline: 1632393600,
//         status: 'blocked',
//         personalInfo: {
//             location: 'New York, US',
//             title: 'UI/UX Designer',
//             birthday: '07/11/1987',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Ron Vargas',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Ron Vargas',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '4',
//         name: 'Luke Cook',
//         email: 'cookie_lukie@hotmail.com',
//         img: '/img/avatars/thumb-4.jpg',
//         role: 'Admin',
//         lastOnline: 1639132800,
//         status: 'active',
//         personalInfo: {
//             location: 'New York, US',
//             title: 'HR Executive',
//             birthday: '07/11/1987',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Luke Cook',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Luke Cook',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '5',
//         name: 'Joyce Freeman',
//         email: 'joyce991@infotech.io',
//         img: '/img/avatars/thumb-5.jpg',
//         role: 'User',
//         lastOnline: 1632416000,
//         status: 'active',
//         personalInfo: {
//             location: 'New York, US',
//             title: 'Frontend Developer',
//             birthday: '17/11/1993',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Joyce Freeman',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Joyce Freeman',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '6',
//         name: 'Samantha Phillips',
//         email: 'samanthaphil@infotech.io',
//         img: '/img/avatars/thumb-6.jpg',
//         role: 'User',
//         lastOnline: 1633107200,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Compliance Manager',
//             birthday: '17/11/1993',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Samantha Phillips',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Samantha Phillips',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '7',
//         name: 'Tara Fletcher',
//         email: 'taratarara@imaze.edu.du',
//         img: '/img/avatars/thumb-7.jpg',
//         role: 'User',
//         lastOnline: 1632761600,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Compliance Manager',
//             birthday: '17/11/1993',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Tara Fletcher',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Tara Fletcher',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '8',
//         name: 'Frederick Adams',
//         email: 'iamfred@imaze.infotech.io',
//         img: '/img/avatars/thumb-8.jpg',
//         role: 'User',
//         lastOnline: 1639219200,
//         status: 'blocked',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Compliance Manager',
//             birthday: '17/11/1993',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Frederick Adams',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Frederick Adams',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '9',
//         name: 'Carolyn Hanson',
//         email: 'carolyn_h@gmail.com',
//         img: '/img/avatars/thumb-9.jpg',
//         role: 'User',
//         lastOnline: 1634489600,
//         status: 'blocked',
//         personalInfo: {
//             location: 'Texas, US',
//             title: 'Compliance Manager',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Carolyn Hanson',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Carolyn Hanson',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '10',
//         name: 'Brittany Hale',
//         email: 'brittany1134@gmail.com',
//         img: '/img/avatars/thumb-10.jpg',
//         role: 'User',
//         lastOnline: 1633452800,
//         status: 'active',
//         personalInfo: {
//             location: 'Texas, US',
//             title: 'Compliance Manager',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Brittany Hale',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Brittany Hale',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '11',
//         name: 'Lloyd Obrien',
//         email: 'handsome-obrien@hotmail.com',
//         img: '/img/avatars/thumb-11.jpg',
//         role: 'User',
//         lastOnline: 1634576000,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Software Engineer',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Lloyd Obrien',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Lloyd Obrien',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '12',
//         name: 'Gabriella May',
//         email: 'maymaymay12@infotech.io',
//         img: '/img/avatars/thumb-12.jpg',
//         role: 'User',
//         lastOnline: 1634208000,
//         status: 'blocked',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Software Engineer',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Gabriella May',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Gabriella May',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '13',
//         name: 'Lee Wheeler',
//         email: 'lee_wheeler@infotech.io',
//         img: '/img/avatars/thumb-13.jpg',
//         role: 'User',
//         lastOnline: 1636649600,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Software Engineer',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Lee Wheeler',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Lee Wheeler',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '14',
//         name: 'Gail Barnes',
//         email: 'gailby0116@infotech.io',
//         img: '/img/avatars/thumb-14.jpg',
//         role: 'User',
//         lastOnline: 1633020800,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Software Engineer',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Gail Barnes',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Gail Barnes',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
//     {
//         id: '15',
//         name: 'Ella Robinson',
//         email: 'ella_robinson@infotech.io',
//         img: '/img/avatars/thumb-15.jpg',
//         role: 'User',
//         lastOnline: 1636217600,
//         status: 'active',
//         personalInfo: {
//             location: 'London, UK',
//             title: 'Software Engineer',
//             birthday: '03/06/1991',
//             phoneNumber: '+12-123-1234',
//             facebook: 'facebook.com/sample',
//             twitter: 'twitter.com/sample',
//             pinterest: 'pinterest.com/sample',
//             linkedIn: 'linkedin/sample',
//         },
//         orderHistory: [
//             {
//                 id: '#36223',
//                 item: 'Mock premium pack',
//                 status: 'pending',
//                 amount: 39.9,
//                 date: 1639132800,
//             },
//             {
//                 id: '#34283',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1636790880,
//             },
//             {
//                 id: '#32234',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1634090880,
//             },
//             {
//                 id: '#31354',
//                 item: 'Business board pro subscription',
//                 status: 'paid',
//                 amount: 59.9,
//                 date: 1631532800,
//             },
//         ],
//         paymentMethod: [
//             {
//                 cardHolderName: 'Ella Robinson',
//                 cardType: 'VISA',
//                 expMonth: '12',
//                 expYear: '25',
//                 last4Number: '0392',
//                 primary: true,
//             },
//             {
//                 cardHolderName: 'Ella Robinson',
//                 cardType: 'MASTER',
//                 expMonth: '06',
//                 expYear: '25',
//                 last4Number: '8461',
//                 primary: false,
//             },
//         ],
//         subscription: [
//             {
//                 plan: 'Business board pro',
//                 status: 'active',
//                 billing: 'monthly',
//                 nextPaymentDate: 1639132800,
//                 amount: 59.9,
//             },
//         ],
//     },
// ]
