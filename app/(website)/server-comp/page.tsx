import getServerInfo from "./functions/get-server-info";

async function ServerComp() {
  const response = await getServerInfo();

  if (!response?.ok) {
    return (
      <div className="p-2 min-h-[calc(100dvh-132px)] text-red-700">
        <p>An Error occurred.</p>
        {response?.message}
      </div>
    )
  }

  return (
    <div className="p-2 min-h-[calc(100dvh-132px)]">
      <p className="mb-5 text-xl">Hi, this is your message:</p>
      <p className="text-blue-600 text-lg">
        {response.data.data}
      </p>
    </div>
  );
}

export default ServerComp;