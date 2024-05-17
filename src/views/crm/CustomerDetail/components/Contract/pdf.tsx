import React from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
       <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
        <div className='flex justify-center my-12'><img src="/Images/logo.png" alt="" className='w-30' style={{width:"100px"}}/></div>
        <div className="flex items-center justify-between mb-4">
         
          <h1 className="text-2xl font-bold">Minutes of Meeting</h1>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
            >
              <line x1="2" x2="5" y1="12" y2="12"></line>
              <line x1="19" x2="22" y1="12" y2="12"></line>
              <line x1="12" x2="12" y1="2" y2="5"></line>
              <line x1="12" x2="12" y1="19" y2="22"></line>
              <circle cx="12" cy="12" r="7"></circle>
            </svg>
            <span className="text-gray-500 dark:text-gray-400">At Site</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span className="text-gray-500 dark:text-gray-400">22-05-2024</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-gray-500 dark:text-gray-400">Attendees</span> */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Attendees</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Client: arvind &amp; Devashish gupta</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Organizer: harshit</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Designer: vivek</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Others: ratnesh</span>
              </li>
            </ul>

            <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Files</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Layout.pdf</span>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Electrical.pdf</span>
              </div>
             
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Plumbing.pdf</span>
              </div>
           
            </div>
          </div>
        </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Remarks</h2>
            <ol className="space-y-2 list-decimal pl-4">
              <li className="text-gray-500 dark:text-gray-400">
                Soft serve machine will be placed over under counter ice cube machine.
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                3 Barrels and Electrical water boiler will be placed in centre of back wall.
              </li>
              <li className="text-gray-500 dark:text-gray-400">Store front facade both edges will be straight.</li>
              <li className="text-gray-500 dark:text-gray-400">
                Front counter- right side topping (10-12 no of topping) counter will be placed with pick-up counter and
                left side food display counter will be placed with order counter.
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                Lockable storage, straw, tissue and carry bag storage will be placed under the pickup counter.
              </li>
              <li className="text-gray-500 dark:text-gray-400">10 Tea powder stand placed on back side wall.</li>
              <li className="text-gray-500 dark:text-gray-400">
                2 inductions will be used intent of 1 dual induction and storage provision for induction will be placed
                under the counter.
              </li>
              <li className="text-gray-500 dark:text-gray-400">Croffle maker placed on back side.</li>
              <li className="text-gray-500 dark:text-gray-400">Coffee machine will be placed on front counter.</li>
              <li className="text-gray-500 dark:text-gray-400">
                Reference images will be shared of Glass stand/ holder to client.
              </li>
            </ol>
          </div>
        </div>
      </div>
            </div>
    );
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default MyComponent;