import Alert from  "./Alert"

const GroceryForm = ({handleSubmit, alert, showAlert, name, setName, isEditing}) => {
  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <h3>Grocery Bud</h3>
      <div className="form-control">
        <input
          type="text"
          className="grocery"
          placeholder="e.g. Eggs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "edit" : "submit"}
        </button>
      </div>
    </form>
  );
};

export default GroceryForm;
