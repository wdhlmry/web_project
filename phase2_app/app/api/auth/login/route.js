import UserRepo from "../../../../repos/userRepo";



export async function POST(request){

    const data = await request.json();

    const user = await UserRepo.findByEmail(data.email);

    if(!user || user.password !== data.password){
        return NextResponse.json(
            {message: "Invaliid Email/Password"},
            {status: 401}
        )
    }

    return NextResponse.json(user)
}

