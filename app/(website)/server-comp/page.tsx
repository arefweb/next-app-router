import getServerInfo from "./functions/get-server-info";

async function ServerComp() {
  const response = await getServerInfo();

  if (!response?.ok) {
    return (
      <div>
        <p>An Error occurred.</p>
        {response?.message}
      </div>
    )
  }

  return (
    <div className="p-2">
      <p className="mb-5">Hi, this is your message:</p>
      <p className="text-orange-500">
        {response.data.data}
      </p>
    </div>
  );
}

export default ServerComp;