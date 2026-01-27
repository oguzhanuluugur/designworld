import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read projects from file
function readProjects() {
  ensureDataDir()
  
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Write projects to file
function writeProjects(projects: any[]) {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8')
}

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = readProjects()
    return NextResponse.json({ success: true, projects })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, location, year, image, description, lang } = body

    // Validation
    if (!title || !category || !location || !year || !description || !lang) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate new project
    const projects = readProjects()
    const newProject = {
      id: Date.now().toString(),
      title,
      category,
      location,
      year,
      lang,
      image: image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description,
      createdAt: new Date().toISOString(),
    }

    projects.unshift(newProject) // Add to beginning
    writeProjects(projects)

    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PUT - Update a project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, category, location, year, lang, image, description } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const projects = readProjects()
    const projectIndex = projects.findIndex((project: any) => project.id === id)

    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update project while keeping original createdAt
    const updatedProject = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      category: category || projects[projectIndex].category,
      location: location || projects[projectIndex].location,
      year: year || projects[projectIndex].year,
      lang: lang || projects[projectIndex].lang,
      image: image || projects[projectIndex].image,
      description: description || projects[projectIndex].description,
    }

    projects[projectIndex] = updatedProject
    writeProjects(projects)

    return NextResponse.json({ success: true, project: updatedProject })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE - Remove a project
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const projects = readProjects()
    const filteredProjects = projects.filter((project: any) => project.id !== id)

    if (filteredProjects.length === projects.length) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    writeProjects(filteredProjects)

    return NextResponse.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
