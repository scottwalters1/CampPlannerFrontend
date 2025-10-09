import type { Campgrounds } from "../../../models/campgrounds";

interface ViewCampGroundsProps{
  campGrounds: Campgrounds[];
  targetDate: Date;
}
 

const ViewCampGrounds = ({campGrounds, targetDate} : ViewCampGroundsProps) => {

  function getActivitiesByDate(){
    return campGrounds.filter(c => c.dates.some(d => d.toDateString() === targetDate.toDateString()));
  }

  return (
    <div className="d-flex flex-column m-3 text-center campGrounds">
      <h3 className="header-container">Campgrounds</h3>
      <div className="inner-container flex-grow-1 p-3">
        {getActivitiesByDate().map((c, index) => (
          <h4 key={index}>{c.campgroundName}</h4>
        ))}
      </div>
    </div>
  );
};

export default ViewCampGrounds;
