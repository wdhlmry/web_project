async function loadStats() {
  const container = document.getElementById("stats-container");

  try {
    const response = await fetch("/api/stats");
    if (!response.ok) {
      throw new Error("Faild to fetch statistics");
    }

    const stats = await response.json();

    container.innerHTML = `
    <div class ="stat-card">
    <h3>Total  Users</h3>
    <p> ${stats.totalUsers}</p>
    </div>

    <div class ="stat-card">
    <h3>Total  Posts</h3>
    <p> ${stats.totalPosts}</p>
    </div>

    <div class ="stat-card">
    <h3>Average Posts Per User</h3>
    <p> ${Number(stats.averagePostsPerUser).toFixed(2)}</p>
    </div>

    <div class="stat-card">
    <h3>Most Active User</h3>
        <p>${
          stats.mostActiveUser
            ? `${stats.mostActiveUser.username} (${stats.mostActiveUser.postsCount} posts)`
            : "No posts yet"
        }</p>
    </div>

    <div class ="stat-card">
    <h3> Latest Post</h3>
        <p>${
          stats.latestPost
            ? `"${stats.latestPost.content}" by ${stats.latestPost.username}`
            : "No posts yet"
        }</p> 
    </div>
    
    <div class="stat-card">
    <h3>Users With No Posts</h3>
        <p>${stats.usersWithNoPosts}</p>
    </div>
    `;
  } catch (error) {
    container.innerHTML = `
        <p> Failed to load statistics. Please check the stats API.</p>
    `;
    console.error(error);
  }
}
loadStats();
