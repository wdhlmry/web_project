import UserRepo from "../../../../repos/userRepo";



export async function POST(request){

    try{
        const data = await request.json();
        const user = await UserRepo.createUser(data);

        return NextResponse.json(user, {status: 201});

    }
    catch(error){
      return NextResponse.json(
        {message: "Registration failed"},
        {status: 500}
      )
    }
}