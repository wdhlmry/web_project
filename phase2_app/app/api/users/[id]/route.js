import UserRepo from "../../../repos/userRepo";


export async function GET({params}){

    const user = await UserRepo.getUserById(params.id);
    return NextResponse.json(user);
}



export async function PUT(request, {params}){

    try{
        const data = await request.json();
        const updated = await UserRepo.updateUser(params.id, data);
        return NextResponse.json(updated);

    }
    catch(error){
        return NextResponse.json({message: "Update Failed!"}, {status: 500});
    }
}



export async function DELETE({params}){

    try{
        const deleted = await UserRepo.deleteUser(params.id);
        return NextResponse.json({message: "User Deleted"});

    }
    catch(error){
        return NextResponse.json({message: "Delete Failed!"}, {status: 500});
    }
}