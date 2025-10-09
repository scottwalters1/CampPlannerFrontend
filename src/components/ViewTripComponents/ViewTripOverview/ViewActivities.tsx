import type { Activities } from "../../../models/activities";

interface ViewActivitiesProps{
  activities: Activities[];
  targetDate: Date;
}
 

const ViewActivities = ({activities, targetDate} : ViewActivitiesProps) => {

  function getActivitiesByDate(){
    return activities.filter(a => a.dates.some(d => d.toDateString() === targetDate.toDateString()));
  }

  return (
    <div className="d-flex flex-column m-3 text-center activities">
      <h3 className="header-container">Activities</h3>
      <div className="inner-container flex-grow-1 p-3">
        {getActivitiesByDate().map((a, index) => (
          <h4 key={index}>{a.activityName}</h4>
        ))}
      </div>
    </div>
  );
};

export default ViewActivities;
