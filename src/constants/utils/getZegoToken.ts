export async function getZegoToken(userID: string) {
  try {
    const res = await fetch(
      `http://10.248.163.125:3000/api/get-zego-token?userID=${userID}`
    );

    const data = await res.json();
    return data.token;
  } catch (error) {
    console.log("Error fetching Zego token:", error);
    return null;
  }
}
