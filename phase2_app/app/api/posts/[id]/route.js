import PostRepo from "../../../../repos/postRepo";



export async function PUT(request, {params}){

    try{
        const data = await request.json();
        const updated = await PostRepo.updatePost(params.id);
        
        return NextResponse.json(updated);

    }
    catch(error){
        return NextResponse.json({message: "Update Failed!"}, {status:500});
    }
}


export async function DELETE({params}){

    try{
        const deleted = await PostRepo.deletePost(params.id);
        return NextResponse.json({message: "Post deleted!"}, deleted);

    }
    catch(error){
        return NextResponse.json({message: "Delete Failed!"}, {status:500});
    }
}