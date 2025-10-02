const ViewActivities = ({ activities }: { activities: string[] }) => {
  return (
    <div className="d-flex flex-column m-4 text-center">
    <h3>Activities</h3>
        <div className="inner-container flex-grow-1 p-3" style={{width:300}}>
            {activities.map((a, index) => (
                <h4 key={index}>{a}</h4>
            ))}
        </div>
    </div>
  );
};


export default ViewActivities