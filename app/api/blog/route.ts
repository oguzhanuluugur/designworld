import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read posts from file
function readPosts() {
  ensureDataDir()
  
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// Write posts to file
function writePosts(posts: any[]) {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

// GET - Fetch all posts
export async function GET() {
  try {
    const posts = readPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, lang, image, excerpt, content } = body

    // Validation
    if (!title || !category || !lang || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate new post
    const posts = readPosts()
    const newPost = {
      id: Date.now().toString(),
      title,
      category,
      lang,
      image: image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      excerpt,
      content,
      date: new Date().toISOString(),
      views: 0,
    }

    posts.unshift(newPost) // Add to beginning
    writePosts(posts)

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// PUT - Update a post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, category, lang, image, excerpt, content } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const posts = readPosts()
    const postIndex = posts.findIndex((post: any) => post.id === id)

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Update post while keeping original date and views
    const updatedPost = {
      ...posts[postIndex],
      title: title || posts[postIndex].title,
      category: category || posts[postIndex].category,
      lang: lang || posts[postIndex].lang,
      image: image || posts[postIndex].image,
      excerpt: excerpt || posts[postIndex].excerpt,
      content: content || posts[postIndex].content,
    }

    posts[postIndex] = updatedPost
    writePosts(posts)

    return NextResponse.json({ success: true, post: updatedPost })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE - Remove a post
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const posts = readPosts()
    const filteredPosts = posts.filter((post: any) => post.id !== id)

    if (filteredPosts.length === posts.length) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    writePosts(filteredPosts)

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
