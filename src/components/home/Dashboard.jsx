import useRole from "../../hooks/useRole";

function Dashboard() {
  const [role, isLoading] = useRole();
  console.log(role);

  return (
    <div>
      <h1>This Dashboard for student and instructor</h1>
    </div>
  );
}

export default Dashboard;
