import UserRepo from "../../../repos/userRepo";



export async function GET(){

    const users = await UserRepo.getAllUsers();

    return NextResponse.json();
}