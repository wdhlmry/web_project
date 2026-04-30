import PostRepo from "../../../repos/postRepo";




export async function GET(request){

    const { searchParams } = new URL(request.URL);
    const userId = searchParams.get("userId");

    if(userId){

        const posts = await PostRepo.getPostsByUser(userId);
        return NextResponse.json(posts);
    }

    const posts = await PostRepo.getAllPosts();
    return NextResponse.json(posts);
}



export async function POST(request){

    const data = request.json();

    const post = await PostRepo.createPost(data);

    return NextResponse.json(post, {status: 201})
}