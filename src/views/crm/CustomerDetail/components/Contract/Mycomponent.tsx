// import { Document, Page, Text, View, Image, BlobProvider, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';
 
// Font.register({
//   family: 'Poppins',
//   fonts: [
//     {
//       src: "http://fonts.gstatic.com/s/poppins/v1/VIeViZ2fPtYBt3B2fQZplvesZW2xOQ-xsNqO47m55DA.ttf",
//       fontWeight: 300
//     },
//     {
//       src: "http://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf",
//       fontWeight: 400
//     },
//     {
//       src: "http://fonts.gstatic.com/s/poppins/v1/4WGKlFyjcmCFVl8pRsgZ9vesZW2xOQ-xsNqO47m55DA.ttf",
//       fontWeight: 500,
//     },
//     {
//       src: "http://fonts.gstatic.com/s/poppins/v1/-zOABrCWORC3lyDh-ajNnPesZW2xOQ-xsNqO47m55DA.ttf",
//       fontWeight: 600,
//     }
//     ,
//     {
//       src: "http://fonts.gstatic.com/s/poppins/v1/8JitanEsk5aDh7mDYs-fYfesZW2xOQ-xsNqO47m55DA.ttf",
//       fontWeight: 700,
//     }
//   ]
// });
 
// const styles = StyleSheet.create({
//   page: {
//     fontFamily: "Times-Roman",
//   },
//   header: {
//     height: 150,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 16,
//     fontFamily: 'Poppins',
//     textAlign: 'center',
//     fontWeight: 700,
//   },
//   text: {
//     fontSize: 14,
//     fontFamily: 'Poppins',
//     textAlign: 'center',
//     fontWeight: 500,
//   },
//   client: {
//     fontSize: 12,
//     marginLeft: 80,
//     marginTop: 30,
//     fontFamily: 'Poppins',
//     fontWeight: 600,
//   },
//   client1: {
//     fontSize: 12,
//     marginLeft: 80,
//     marginTop: 10,
//     fontFamily: 'Poppins',
//   },
//   client2: {
//     fontSize: 12,
//     marginLeft: 192,
//     fontFamily: 'Poppins',
//   },
//   number: {
//     fontSize: 12,
//     marginLeft: 10,
//     fontFamily: 'Poppins',
//   },
//   scope: {
//     fontSize: 12,
//     textAlign: 'center',
//     fontFamily: 'Poppins',
//     marginTop: 16,
//     fontWeight: 700,
//     textDecoration: "underline",
//   },
//   scope1: {
//     fontSize: 12,
//     fontFamily: 'Poppins',
//     marginTop: 8,
//     marginRight: 60,
//     marginLeft: 60,
//     justifyContent: 'space-between',
//   },
//   part: {
//     fontSize: 12,
//     fontFamily: 'Poppins',
//     fontWeight:700,
//     textDecoration: 'underline',
//   },
//   partText: {
//     display:'flex',
//     flexDirection:'row',
//     gap:'25px',
//     justifyContent:'space-between',marginRight:55,
//   },
//   part1: {
//     fontSize: 12,
//     textAlign: 'center',
//     fontFamily: 'Poppins',
//     marginTop: 40,
//     fontWeight: 700,
//     textDecoration: "underline",
//   },
//   text1: {
//       fontSize: 12,
//       fontFamily: 'Poppins',
//       textAlign: 'center',
//       marginTop: 8,
//     },
//   part1Text: {
//       display:'flex',
//       flexDirection:'row',
//       gap:'12px',
//       marginRight:55,
//       marginLeft:100
//     },
//     part11: {
//       fontSize: 12,
//       fontFamily: 'Poppins',
//       marginTop: 8,
//     },
//     part12: {
//       fontSize: 12,
//       fontFamily: 'Poppins',
//       fontWeight: 700,
//       marginTop: 8,
//     },
//     part13: {
//       display:'flex',
//       flexDirection:'row',
//       gap:'20px',
//       marginRight:55,
//       marginLeft:120,
//     },
//     part14: {
//       fontSize: 12,
//       fontFamily: 'Poppins',
//       marginTop: 8,
//       textDecoration: 'underline',
//     },
   
//     dothead:{
//       display: 'flex',
//       flexDirection: 'row',
//       gap: 20,
//       alignItems: 'center',
//       fontFamily:"Poppins",
//       marginLeft:88
   
   
//     },
//  dot:{
//   fontSize: 18,
//   fontFamily: 'Poppins',
//   fontWeight: 700,
//   textAlign:"left"
 
//  },
//  section: {
//   marginBottom: 10,
// },
// list: {
//   marginLeft:118
 
// },
// listItem: {
//   marginBottom: 2,
// },
// sublistItem: {
//   marginLeft: 10,
//   marginBottom: 2,
// },
// part15:{
//   fontSize: 12,
//       fontFamily: 'Poppins',
//       marginTop: 8,
//       marginRight:30,
//       marginLeft:25
 
// },
// part16:{
// marginLeft:60
// },
// part2Text: {
//   display:'flex',
//   flexDirection:'row',
//   gap:'12px',
//   marginRight: 30,
// },
// scope3: {
//   fontSize: 12,
//   fontFamily: 'Poppins',
//   marginTop: 8,
//   marginRight: 60,
//   marginLeft: 30,
//   justifyContent: 'space-between',
// },
// dothead1:{
//   display: 'flex',
//   flexDirection: 'row',
//   gap: 20,
//   fontFamily:"Poppins",
//   marginLeft:88
 
 
// },
// dot1:{
//   fontSize: 18,
//   fontFamily: 'Poppins',
//   fontWeight: 700,
 
 
//  },
// part7:{
//   fontSize: 12,
//   fontFamily: 'Poppins',
//   fontWeight: 600,
//   marginRight:30
// },
// part71: {
//   fontSize: 12,
//   fontFamily: 'Poppins',
//   fontWeight: 700,
//   marginTop: 8,
//   textDecoration:'underline'
// },
// part72:{
//   marginTop:20,
//   marginBottom:20,
//   fontSize: 12,
//   fontFamily: 'Poppins',
//   color:'#dcdcdc'
 
// },
 
   
//   image: {
//     margin: 10,
//     width: 100,
//     height: 150,
//     marginTop: 60,
//   },
// });
 
// const MyDocument = () => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.header}>
//         <Image style={styles.image} src={'/public/Images/logo.png'} />
//       </View>
//       <View>
//         <Text style={styles.headerText}>Architecture, Construction & Interior Design Implementation</Text>
//         <Text style={styles.headerText}>CONTRACT</Text>
//         <Text style={styles.text}>PROJ. NAME, LOCATION</Text>
//       </View>
//       <View style={styles.client}>
//         <Text>Client                     - Client Name</Text>
//         <Text>Designer                - Ms. Naomi Sahay</Text>
//       </View>
//       <View style={styles.client1}>
//         <Text>Date                       - 21-05-2024</Text>
//         <Text>Quotation No         - CCPL /FY25/ 03</Text>
//         <Text>Site Address          - Delhi</Text>
//       </View>
//       <View style={styles.client1}>
//         <Text>Client Contract      - Primary Client;</Text>
//       </View>
//       <View style={styles.client2}>
//         <Text style={styles.number}> +91 1234567890, abcd@gmail.com</Text>
//         <Text>- Secondary client;</Text>
//         <Text style={styles.number}>+91 1234567890, abcd@gmail.com</Text>
//       </View>
//       <View style={styles.client1}>
//         <Text>Colonelz’ Contact  - Ms. Naomi Sahay, Principal Designer;</Text>
//       </View>
//       <View style={styles.client2}>
//         <Text style={styles.number}>+91 8447500754, naomi@colonelz.com</Text>
//       </View>
//       <View style={styles.scope}>
//         <Text>Scope of Work</Text>
//       </View>
//       <View style={styles.scope1}>
//         <Text>The Scope of work entails Architectural Planning, Construction, Interior Designing
//           and Implementation by Colonelz Constructions Pvt Ltd, with Corporate Office at
//           D11, Vipul World, Sector 48, Sohna Road, Gurgaon, Haryana- 122018,
//           represented by Ms Naomi Sahay, (hereinafter known as The Designer). The
//           Scope shall include the preparation of all drawings for the execution of the
//           designs finalised and the implementation of finalised designs by the Colonelz
//           Team, in the apartment of Primary client name, r/o Site Address, (hereinafter
//           known as The Client). Design scope shall also cover supervision during the
//           implementation of the same.</Text>
//       </View>
//       <View style={styles.scope1}>
//       <View style={styles.partText}>
       
//         <View><Text style={styles.part} >Part I.</Text> </View>
//         <View><Text >Architectural Planning, Construction & Interior Designing of the
// complete space.</Text> </View>
//             </View>
//        <View style={styles.partText}>
       
//       <View><Text style={styles.part} >Part II.</Text> </View>
//       <View><Text >Implementation and Execution of the finalised Design as detailed by
//           The Designer and approved by The Client</Text> </View>
//           </View>
//       </View>
//       <View> <Text style={styles.part1}>Part I</Text></View>
//       <View><Text style={styles.text1}>This is the Designing Part, which will be covered in 2 parts, as below:
// </Text></View>
//       <View style={styles.part1Text}>
//         <View><Text style={styles.part11} >1.</Text></View>
//         <View><Text style={styles.part12}>Phase I –Design Stage,</Text></View>
//         <View><Text style={styles.part11} >i.e., Stage 1:</Text></View>
//       </View>
//       <View style={styles.part13}>
//         <View> <Text style={styles.part11}>a.</Text></View>
//         <View> <Text style={styles.part14}>Presentation Drawings:</Text></View>
//       </View>
 
//       <View style={styles.scope1}>
//       <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Furniture Layout Plan</Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Presentation with Conceptual Pictures & Sketches
// </Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Conceptual 3D Views with 1 view each of the following spaces:</Text></View>
//      </View>
 
//      <View style={styles.section}>
//         <View style={styles.list}>
//           <Text style={styles.listItem}>{`>`}   Bedrooms          - 3 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Drawing room</Text>
//           <Text style={styles.listItem}>{`>`}   Kitchen</Text>
//           <Text style={styles.listItem}>{`>`}   Living & Dining area</Text>
//           <Text style={styles.listItem}>{`>`}   Main Entrance</Text>
//           <Text style={styles.listItem}>{`>`}   Foyer.</Text>
//           <Text style={styles.listItem}>{`>`}   Lift lobby</Text>
//           <Text style={styles.listItem}>{`>`}   Balconies         - 2 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Toilets               - 4 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Terrace Hall room</Text>
//           <Text style={styles.listItem}>{`>`}   Terrace Open area</Text>
//         </View>
//       </View>
//      </View>
//      <View style={styles.part13}>
//         <View> <Text style={styles.part11}>b.</Text></View>
//         <View> <Text style={styles.part14}>Civil Work Drawings (as per requirement):</Text></View>
//       </View>
//       <View style={styles.scope1}>
//       <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text > Floor Plan
//  </Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Structural Layout
// </Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Electrical Layout</Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Plumbing Layout </Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >HVAC ducting Layout</Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >False Ceiling Plan</Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Toilet Layout</Text></View>
//      </View>
//      </View>
 
//      <View style={styles.part1Text}>
//         <View><Text style={styles.part11} >2.</Text></View>
//         <View><Text style={styles.part12}>Phase II – Interior Fit Out Stage:</Text></View>
//       </View>
//       <View style={styles.part13}>
//         <View> <Text style={styles.part11}>a.</Text></View>
//         <View> <Text style={styles.part14}>Stage 2: Design Development Phase 1</Text></View>
//       </View>
//       <View style={styles.scope1}>
//       <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Detailed 3D Views with 1-2 views each (as per requirement) of the
// following spaces (with finalised details):
// </Text></View>
//      </View>
//      <View style={styles.section}>
//         <View style={styles.list}>
//           <Text style={styles.listItem}>{`>`}   Bedrooms          - 3 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Drawing room</Text>
//           <Text style={styles.listItem}>{`>`}   Kitchen</Text>
//           <Text style={styles.listItem}>{`>`}   Living & Dining area</Text>
//           <Text style={styles.listItem}>{`>`}   Main Entrance</Text>
//           <Text style={styles.listItem}>{`>`}   Foyer.</Text>
//           <Text style={styles.listItem}>{`>`}   Lift lobby</Text>
//           <Text style={styles.listItem}>{`>`}   Balconies         - 2 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Toilets               - 4 no.</Text>
//           <Text style={styles.listItem}>{`>`}   Terrace Hall room</Text>
//           <Text style={styles.listItem}>{`>`}   Terrace Open area</Text>
//         </View>
//       </View>
//      </View>
//      <View style={styles.part1Text}>
//         <View><Text style={styles.part11} >b.</Text></View>
//         <View><Text style={styles.part14}>Stage 3: Good for Construction (GFC) Drawings </Text></View>
//         <View><Text style={styles.part15}>– Working drawings  </Text>
//         </View>
//       </View>
 
//       <View style={styles.scope1}>
//       <View><Text style={styles.part16}>that give detailed dimensions, graphical information that can be used </Text></View>
//       </View>
 
 
//                                            {/* Page No.7 */}
//       <View style={styles.scope1}>                                
//       <View style={styles.dothead1}>
//      <View ><Text style={styles.dot1} >•</Text></View>
//      <View><Text style={styles.part7} >Orders once confirmed / closed, cannot be cancelled and are 100% payable.
// </Text></View>
//      </View>
//      </View>
//      <View style={styles.part1Text}>
//         <View><Text style={styles.part11} >3.</Text></View>
//         <View><Text style={styles.part71}>3D Visualisation</Text></View>
       
//       </View>
//       <View style={styles.scope1}>
//       <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >  Conceptual Stage- 2 selected design options in 3D for each space as per
// views mentioned in Design Contract will be provided.
 
//  </Text></View>
//  </View>
//  </View>
//  <View style={styles.part72}>
//   <Text>Please note, major changes in the 3D after finalisation lead to revisions in
// 2D drawings and the project timeline.
// </Text>
//  </View>
   
//  <View style={styles.scope1}>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text >Detail Finalisation- 2 selected finish combinations in 3D for each space as
// per views mentioned in Design Contract will be provided
// </Text></View>
//      </View>
//      <View style={styles.dothead}>
//      <View ><Text style={styles.dot} >•</Text></View>
//      <View><Text > Revisions. Minor revisions offered until finalisation of design, will be free,
// thereafter chargeable. These will be chargeable @₹3500/ per render
// view.
// </Text></View>
//      </View>
   
   
//      </View>
 
 
//     </Page>
//   </Document>
// );
 
// const MyComponent = () => {
//   const handlePost = async (blob) => {
//     const formData = new FormData();
//     formData.append('project_id', "COLP-946832");
//     formData.append('folder_name', "review");
//     formData.append('files', blob, 'myDocument.pdf');
 
//     const response = await fetch('https://colonelzadmin.prod.initz.run/v1/api/admin/project/fileupload', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('auth')}`,
//       },
//       body: formData,
//     });
//     const result = await response.json();
//     console.log(result);
//   }
//   return (
//     <div>
//       <BlobProvider document={<MyDocument />}>
//         {({ blob, url, loading, error }) => {
//           if (loading) {
//             return 'Loading document...';
//           }
//           if (error) {
//             console.error(error);
//             return `Error: ${error.message}`;
//           }
 
//           return (
//             <div>
//               <button onClick={() => { handlePost(blob) }}>send</button>
//               <a href={url} target="_blank" rel="noopener noreferrer">View PDF</a>
//               <a href={url} download="myDocument.pdf">Download PDF</a>
//             </div>
//           );
//         }}
//       </BlobProvider>
//       <PDFViewer width="100%" height="600">
//         <MyDocument />
//       </PDFViewer>
//     </div>
//   )
// };
 
// export default MyComponent;