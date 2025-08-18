import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    User, 
    Calendar, 
    FileText, 
    Settings, 
    Bell,
    CheckCircle,
    Clock,
    TrendingUp
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Member Dashboard',
        href: '/member/dashboard',
    },
];

export default function MemberDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Member Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
                        <p className="text-muted-foreground">
                            Here's what's happening with your account today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">89</div>
                            <p className="text-xs text-muted-foreground">
                                +12% from last week
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">5</div>
                            <p className="text-xs text-muted-foreground">
                                -3 from yesterday
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Performance</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">94%</div>
                            <p className="text-xs text-muted-foreground">
                                +5% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Your latest activities and updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: 'Project Alpha completed',
                                        description: 'Successfully finished the main development phase',
                                        time: '2 hours ago',
                                        status: 'completed'
                                    },
                                    {
                                        title: 'New task assigned',
                                        description: 'Review and approve design mockups',
                                        time: '4 hours ago',
                                        status: 'pending'
                                    },
                                    {
                                        title: 'Team meeting scheduled',
                                        description: 'Weekly standup meeting at 10:00 AM',
                                        time: '1 day ago',
                                        status: 'scheduled'
                                    },
                                    {
                                        title: 'Document updated',
                                        description: 'API documentation has been updated',
                                        time: '2 days ago',
                                        status: 'completed'
                                    }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className={`w-2 h-2 rounded-full mt-2 ${
                                            activity.status === 'completed' ? 'bg-green-500' :
                                            activity.status === 'pending' ? 'bg-orange-500' :
                                            'bg-blue-500'
                                        }`} />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {activity.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {activity.time}
                                            </p>
                                        </div>
                                        <Badge variant={
                                            activity.status === 'completed' ? 'default' :
                                            activity.status === 'pending' ? 'secondary' :
                                            'outline'
                                        }>
                                            {activity.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and shortcuts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start" variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Create New Project
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Meeting
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <User className="mr-2 h-4 w-4" />
                                Update Profile
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <Settings className="mr-2 h-4 w-4" />
                                Account Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Events */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>
                            Your scheduled meetings and deadlines
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    title: 'Team Standup',
                                    time: 'Today, 10:00 AM',
                                    type: 'meeting',
                                    attendees: 8
                                },
                                {
                                    title: 'Project Review',
                                    time: 'Tomorrow, 2:00 PM',
                                    type: 'review',
                                    attendees: 5
                                },
                                {
                                    title: 'Client Presentation',
                                    time: 'Friday, 11:00 AM',
                                    type: 'presentation',
                                    attendees: 12
                                }
                            ].map((event, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${
                                            event.type === 'meeting' ? 'bg-blue-500' :
                                            event.type === 'review' ? 'bg-green-500' :
                                            'bg-purple-500'
                                        }`} />
                                        <div>
                                            <p className="font-medium">{event.title}</p>
                                            <p className="text-sm text-muted-foreground">{event.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline">{event.attendees} attendees</Badge>
                                        <Button size="sm" variant="outline">Join</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
