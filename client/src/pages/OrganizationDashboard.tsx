import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart3, 
  Settings, 
  Plus, 
  QrCode,
  Eye,
  Edit,
  Copy,
  Trash2,
  Star,
  MessageSquare,
  Calendar,
  TrendingUp,
  AlertCircle,
  Loader2,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// Types
interface OrgInfo {
  name: string;
  type: string;
  primaryColor: string;
  logo: string;
}

interface Stats {
  totalForms: number;
  totalResponses: number;
  avgRating: number;
  responseRate: string;
}

interface FeedbackForm {
  _id: string;
  name: string;
  category: string;
  responses: number;
  avgRating: number;
  status: 'active' | 'inactive';
  qrScans: number;
  lastResponse: string;
  createdAt: string;
}

interface RecentFeedback {
  form: string;
  rating: number;
  comment: string;
  time: string;
}

const OrganizationDashboard = () => {
  // State
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [orgInfo, setOrgInfo] = useState<OrgInfo>({ 
    name: '', 
    type: '', 
    primaryColor: '#3B82F6', 
    logo: '' 
  });
  const [stats, setStats] = useState<Stats>({
    totalForms: 0,
    totalResponses: 0,
    avgRating: 0,
    responseRate: "0%"
  });
  const [feedbackForms, setFeedbackForms] = useState<FeedbackForm[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<RecentFeedback[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("forms");

  // Configure axios to include credentials for session cookies
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:5000';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      // First check if user is authenticated by getting session info
      const sessionRes = await axios.get('/api/auth/session');
      
      if (!sessionRes.data.authenticated) {
        setError("Please log in to access the dashboard");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      // Fetch all data in parallel - no need to pass orgId as it's in session
      const [orgInfoRes, statsRes, formsRes, feedbackRes] = await Promise.all([
        axios.get('/api/dashboard/org-info'),
        axios.get('/api/dashboard/stats'),
        axios.get('/api/dashboard/forms'),
        axios.get('/api/dashboard/recent-feedback')
      ]);

      setOrgInfo(orgInfoRes.data);
      setStats(statsRes.data);
      setFeedbackForms(formsRes.data || []);
      setRecentFeedback(feedbackRes.data || []);

    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if logout request fails
      window.location.href = "/login";
    }
  };

  const handleCreateForm = () => {
    window.location.href = "/form-builder";
  };

  const handleFormAction = async (formId: string, action: string) => {
    try {
      switch (action) {
        case 'view':
          window.location.href = `/form/${formId}`;
          break;
        case 'edit':
          window.location.href = `/form-builder/${formId}`;
          break;
        case 'copy':
          await axios.post(`/api/forms/${formId}/copy`);
          fetchDashboardData(); // Refresh data
          break;
        case 'delete':
          if (window.confirm("Are you sure you want to delete this form?")) {
            await axios.delete(`/api/forms/${formId}`);
            fetchDashboardData(); // Refresh data
          }
          break;
        case 'qr':
          window.open(`/qr-generator/${formId}`, '_blank');
          break;
      }
    } catch (err: any) {
      console.error(`Error performing ${action} on form:`, err);
      setError(err.response?.data?.message || `Failed to ${action} form`);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString || "N/A";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{orgInfo.logo || "🏢"}</span>
                <div>
                  <h2 className="font-semibold">{orgInfo.name || "Organization"}</h2>
                  <Badge variant="secondary" className="text-xs">{orgInfo.type}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleCreateForm}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Form
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">OA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Forms</p>
                  <p className="text-2xl font-bold">{stats.totalForms}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold">{stats.totalResponses}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold">{stats.responseRate}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="forms">Feedback Forms</TabsTrigger>
            <TabsTrigger value="responses">Recent Responses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Feedback Forms</CardTitle>
                    <CardDescription>Manage your organization's feedback collection forms</CardDescription>
                  </div>
                  <Button 
                    onClick={handleCreateForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Create New Form
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackForms.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No forms created yet. Create your first form to get started!</p>
                      <Button 
                        onClick={handleCreateForm}
                        className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Create Your First Form
                      </Button>
                    </div>
                  ) : (
                    feedbackForms.map((form) => (
                      <div 
                        key={form._id} 
                        className={`p-4 border rounded-lg transition-all cursor-pointer ${
                          selectedForm === form._id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`} 
                        onClick={() => setSelectedForm(form._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <MessageSquare className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{form.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{form.category}</span>
                                <span>•</span>
                                <span>{form.responses} responses</span>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-400 mr-1" /> 
                                  {form.avgRating?.toFixed(1) || '0.0'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge 
                              variant={form.status === 'active' ? 'default' : 'secondary'} 
                              className={form.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                            >
                              {form.status}
                            </Badge>
                            <div className="text-right text-sm text-gray-500">
                              <div>QR Scans: {form.qrScans || 0}</div>
                              <div>Last: {formatDate(form.lastResponse)}</div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormAction(form._id, 'qr');
                                }}
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormAction(form._id, 'view');
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormAction(form._id, 'edit');
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormAction(form._id, 'copy');
                                }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormAction(form._id, 'delete');
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="responses">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest responses from your feedback forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{feedback.form}</Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{feedback.time}</span>
                      </div>
                      <p className="text-gray-700">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed insights into your feedback performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Analytics charts coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Organization Branding</CardTitle>
                <CardDescription>Customize your organization's appearance and branding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name</label>
                      <Input value={orgInfo.name} readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Type</label>
                      <Input value={orgInfo.type} readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex items-center space-x-4">
                      <Input value={orgInfo.primaryColor} className="max-w-32" readOnly />
                      <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: orgInfo.primaryColor }}></div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
