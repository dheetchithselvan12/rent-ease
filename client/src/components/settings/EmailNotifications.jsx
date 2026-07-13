const EmailNotifications = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Email Notifications</h1>
        <p className="text-gray-500 text-sm">
          Update your email preferences.
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input type="checkbox" id="promotional" />
          <label htmlFor="promotional">Promotional Emails</label>
        </div>
        <div className="flex items-center gap-4">
          <input type="checkbox" id="new-products" />
          <label htmlFor="new-products">New Products</label>
        </div>
        <div className="flex items-center gap-4">
          <input type="checkbox" id="new-features" />
          <label htmlFor="new-features">New Features</label>
        </div>
        <button className="bg-blue-500 text-white rounded-md p-2 w-fit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EmailNotifications;
