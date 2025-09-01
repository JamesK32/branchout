import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistEntry, getWaitlistCount } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone, year_of_study, school } = body;

    // Basic validation
    if (!first_name || !last_name || !email || !year_of_study || !school) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add to waitlist
    await addWaitlistEntry({
      first_name,
      last_name,
      email,
      phone,
      year_of_study,
      school
    });

    // Get updated count
    const count = await getWaitlistCount();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined waitlist!',
      count 
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return NextResponse.json(
      { error: 'Failed to get waitlist count' },
      { status: 500 }
    );
  }
}
