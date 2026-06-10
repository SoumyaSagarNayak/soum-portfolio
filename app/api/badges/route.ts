import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.credly.com/users/soumya-sagar-nayak.ae8822ea/badges.json",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from Credly: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching Credly badges:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch badges from Credly" },
      { status: 500 }
    );
  }
}
