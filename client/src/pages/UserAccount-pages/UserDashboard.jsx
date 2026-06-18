const UserDashboard = () => {
  return (
    <div className="border border-gray-300 rounded-lg h-full">
      {/* Dashboard Headline */}
      <div>
        <p>Hello, Users</p>
        <p>Here's an overview of your RentEase Account.</p>
      </div>

      {/* Indicator */}
      <div>
        <div>
          <p>Logo</p>
          <div>
            <p>Active Rentals</p>
            <p>2</p>
          </div>
        </div>
      </div>

      {/* Active Rentals */}
      <div>Rental Cards</div>

      {/* Rental History */}
      <div>tables</div>
    </div>
  );
};

export default UserDashboard;
