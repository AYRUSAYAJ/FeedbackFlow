
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Organizations",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Building2
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+18%",
      trend: "up",
      icon: Users
    },
    {
      title: "Feedback Collected",
      value: "15,832",
      change: "+24%",
      trend: "up",
      icon: BarChart3
    },
    {
      title: "Avg Response Rate",
      value: "68%",
      change: "-3%",
      trend: "down",
      icon: TrendingUp
    }
  ];

  const organizations = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Healthcare",
      users: 45,
      forms: 12,
      responses: 2847,
      status: "active",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Grand Plaza Hotel",
      type: "Hospitality",
      users: 23,
      forms: 8,
      responses: 1923,
      status: "active",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Westfield Elementary",
      type: "Education",
      users: 18,
      forms: 6,
      responses: 894,
      status: "inactive",
      lastActive: "1 week ago"
    },
    {
      id: 4,
      name: "Metro Restaurant Group",
      type: "Food Service",
      users: 31,
      forms: 15,
      responses: 3254,
      status: "active",
      lastActive: "5 hours ago"
    }
  ];

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <span className="text-xl font-bold">FeedbackFlow</span>
              </Link>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Super Admin
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="analytics">Global Analytics</TabsTrigger>
            <TabsTrigger value="templates">Form Templates</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Organization Management</CardTitle>
                    <CardDescription>
                      Manage all organizations and their access to the platform
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Organization
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrganizations.map((org) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{org.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{org.type}</span>
                            <span>•</span>
                            <span>{org.users} users</span>
                            <span>•</span>
                            <span>{org.forms} forms</span>
                            <span>•</span>
                            <span>{org.responses} responses</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={org.status === 'active' ? 'default' : 'secondary'}
                          className={org.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {org.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{org.lastActive}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Global Analytics</CardTitle>
                <CardDescription>
                  Platform-wide metrics and insights across all organizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Shared Form Templates</CardTitle>
                <CardDescription>
                  Approve and manage templates that organizations can share with each other
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Template management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure global platform settings and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Platform settings coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
