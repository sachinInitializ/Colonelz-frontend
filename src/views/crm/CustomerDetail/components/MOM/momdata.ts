import { useLocation } from "react-router-dom";

interface QueryParams {
  id: string;
  project_id: string;
  mom: string;
}

const ParseQueryStringComponent: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Create an object to store and map the query parameters
  const allQueryParams: QueryParams = {
    id: queryParams.get('id') || '',
    project_id: queryParams.get('project_id') || '',
    mom: queryParams.get('type') || '',
  };

  return allQueryParams.project_id;
};

export default ParseQueryStringComponent;
y