// types.ts

export interface Attendees {
    client_name: string;
    // Add other properties related to attendees if needed
  }
  
  export interface Mom {
    mom_id: number;
    meetingdate: string;
    source: string;
    attendees: Attendees;
    // Add other properties related to Mom if needed
  }
  
  export interface Project {
    project_name: string;
    mom: Mom[];
    // Add other properties related to Project if needed
  }
  