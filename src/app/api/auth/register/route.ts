import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User, IUser } from '@/models/User';

interface RegisterRequestBody {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: RegisterRequestBody = await req.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = (await User.findOne({ email: normalizedEmail }).exec()) as IUser | null;

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Register Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}