import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Award, BookOpen, Building2, CheckCircle, Globe, Star, Users, Zap, Calendar, ExternalLink, Facebook, Instagram, Linkedin, Twitter, Play } from 'lucide-react';

export default function Landing() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Global Fintech Institute - Empowering Global Fintech Leaders">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-neutral-100">
                {/* Navigation */}
                <nav className="relative bg-neutral-100 border-b border-neutral-200">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-neutral-900 tracking-tight">
                                    GFI
                                </div>
                            </div>
                            
                            <div className="hidden lg:flex items-center space-x-8">
                                <div className="relative group">
                                    <button className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors flex items-center">
                                        Certifications
                                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors flex items-center">
                                    Programs
                                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <a href="#research" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">Research</a>
                                <button className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors flex items-center">
                                    Membership
                                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <button className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors flex items-center">
                                    Learn
                                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <a href="#news" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors">News</a>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button className="bg-neutral-900 text-white hover:bg-neutral-800 text-sm px-6 py-2 rounded-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')}>
                                            <Button variant="ghost" className="text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 text-sm px-4 py-2">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button className="bg-neutral-900 text-white hover:bg-neutral-800 text-sm px-6 py-2 rounded-full">
                                                Register
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative bg-neutral-100 pt-20 pb-32">
                    <div className="mx-auto max-w-5xl px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-tight mb-12">
                                Fintech{' '}
                                <span className="underline decoration-orange-400 decoration-4">education</span>{' '}
                                and certification that puts{' '}
                                <span className="underline decoration-orange-400 decoration-4">excellence</span>{' '}
                                at the frontier
                            </h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                <Card className="p-6 bg-white border border-neutral-200 rounded-2xl">
                                    <div className="mb-4">
                                        <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">CERTIFICATION</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Become CFtA Certified</h3>
                                    <p className="text-neutral-600 text-sm mb-6">
                                        Certificate in Fintech & AI, our foundational certification, is now available.
                                    </p>
                                    <Link href={route('register')}>
                                        <Button className="bg-neutral-900 text-white hover:bg-neutral-800 text-sm px-6 py-2 rounded-full w-full">
                                            Start Certification
                                        </Button>
                                    </Link>
                                </Card>
                                
                                <Card className="p-6 bg-white border border-neutral-200 rounded-2xl">
                                    <div className="mb-4">
                                        <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">PROGRAMS</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Professional Development</h3>
                                    <p className="text-neutral-600 text-sm mb-6">
                                        Advance your career with industry-leading fintech education programs.
                                    </p>
                                    <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm px-6 py-2 rounded-full w-full">
                                        Learn more
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Section */}
                <section className="bg-white rounded-t-3xl relative -mt-16 pt-20 pb-16">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="bg-neutral-50 rounded-3xl p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                <div className="lg:col-span-2">
                                    <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                                        CFtA and CFtP Programs
                                    </h2>
                                    <p className="text-lg text-neutral-700 mb-8">
                                        Our comprehensive certification programs are designed by industry experts to prepare you for leadership in fintech innovation and emerging financial technologies.
                                    </p>
                                    <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 text-sm px-6 py-2 rounded-full">
                                        Read announcement
                                    </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-3">
                                    <Card className="p-3 bg-neutral-200 border-0 rounded-xl">
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-neutral-600">Program details</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-neutral-900">CFtA</h3>
                                            <ArrowRight className="h-4 w-4 text-neutral-600" />
                                        </div>
                                    </Card>
                                    
                                    <Card className="p-3 bg-neutral-200 border-0 rounded-xl">
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-neutral-600">Program details</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-neutral-900">CFtP</h3>
                                            <ArrowRight className="h-4 w-4 text-neutral-600" />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video/Quote Section */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="bg-white rounded-full p-4 inline-block mb-4">
                                            <Play className="h-8 w-8 text-neutral-900" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Future of FinTech</h3>
                                        <p className="text-neutral-700">Industry Insights</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <blockquote className="text-2xl font-medium text-neutral-900 mb-6">
                                    "If knowledge is power and we're building professionals that have more expertise than traditional finance, what will happen between us and the industry?"
                                </blockquote>
                                <div className="text-sm text-neutral-600">
                                    <div className="font-medium">David Brear</div>
                                    <div>CEO, Global FinTech Institute</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="bg-white py-16 border-t border-neutral-200">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-neutral-900 mb-8">
                                At GFI, we build education to serve the industry's long-term excellence.
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div>
                                    <p className="text-lg text-neutral-700">
                                        While no one can foresee every outcome fintech will have on society, we do know that developing skilled professionals requires both comprehensive education and intentional focus on practical applications.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-neutral-700">
                                        That's why we focus on building certifications with industry relevance at their foundation, like CFtA and CFtP. Through our rigorous curriculum, expert instruction, and global network, we aim to demonstrate what responsible fintech education looks like in practice.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Three Column Cards */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-8 bg-neutral-50 border-0 rounded-3xl">
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-neutral-200 rounded-2xl flex items-center justify-center mb-6">
                                        <svg width="32" height="32" viewBox="0 0 32 32" className="text-neutral-700">
                                            <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                                            <circle cx="24" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                                            <circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M11 8h8M20 12l-4 8" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    Industry Standards for FinTech
                                </h3>
                            </Card>
                            
                            <Card className="p-8 bg-teal-50 border-0 rounded-3xl">
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                                        <svg width="32" height="32" viewBox="0 0 32 32" className="text-teal-700">
                                            <rect x="6" y="12" width="20" height="3" fill="currentColor" rx="1"/>
                                            <rect x="6" y="18" width="16" height="3" fill="currentColor" rx="1"/>
                                            <rect x="6" y="24" width="12" height="3" fill="currentColor" rx="1"/>
                                            <path d="M4 8h24v2H4z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    GFI's Professional Development Framework
                                </h3>
                            </Card>
                            
                            <Card className="p-8 bg-purple-50 border-0 rounded-3xl">
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                        <svg width="32" height="32" viewBox="0 0 32 32" className="text-purple-700">
                                            <rect x="8" y="8" width="16" height="10" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
                                            <rect x="12" y="12" width="8" height="2" fill="currentColor" rx="1"/>
                                            <rect x="10" y="22" width="12" height="2" fill="currentColor" rx="1"/>
                                            <circle cx="16" cy="26" r="2" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    GFI Academy: Learn to build with FinTech
                                </h3>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Featured News */}
                <section className="bg-white py-16 border-t border-neutral-200">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Featured</h2>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-neutral-200 last:border-b-0">
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-neutral-900">CFtA with Enhanced AI Curriculum</h3>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span>Certification</span>
                                    <span>Jan 15, 2025</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-neutral-200">
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-neutral-900">CFtP Professional Program</h3>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span>Programs</span>
                                    <span>Jan 10, 2025</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-neutral-200">
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-neutral-900">Industry Partnership Expansion</h3>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span>Partnerships</span>
                                    <span>Dec 28, 2024</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-neutral-200">
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-neutral-900">Global FinTech Standards Initiative</h3>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span>Research</span>
                                    <span>Dec 20, 2024</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-neutral-200">
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-neutral-900">New Executive Education Track</h3>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span>Education</span>
                                    <span>Dec 15, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                        <h2 className="text-5xl font-bold text-neutral-900 mb-12">
                            Want to help us build the future of professional FinTech education?
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button className="bg-neutral-900 text-white hover:bg-neutral-800 text-sm px-8 py-3 rounded-full">
                                See open programs
                            </Button>
                            <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 text-sm px-8 py-3 rounded-full">
                                Speak with admissions
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}