import PostRepo from "../../../repos/postRepo";




export async function GET(){

    const posts = await PostRepo.getAllPosts();

    return NextResponse.json(post);
}



export async function POST(request){

    const data = request.json();

    const post = await PostRepo.createPost(data);

    return NextResponse.json(post, {status: 201})
}