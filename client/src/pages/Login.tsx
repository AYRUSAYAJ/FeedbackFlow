import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Shield, User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [superAdminPassword, setSuperAdminPassword] = useState("");
  const [orgAdminEmail, setOrgAdminEmail] = useState("");
  const [orgAdminPassword, setOrgAdminPassword] = useState("");
  const [orgCode, setOrgCode] = useState("");

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login/superadmin", {
        email: superAdminEmail,
        password: superAdminPassword,
      });
      console.log("Super Admin login successful:", res.data);
      // Optional: Save token/user info
      // localStorage.setItem("token", res.data.token);
      window.location.href = "/admin-dashboard";
    } catch (err) {
      console.error("Super Admin login failed:", err);
      alert("Invalid Super Admin credentials");
    }
  };

  const handleOrgAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login/orgadmin", {
        email: orgAdminEmail,
        password: orgAdminPassword,
        orgCode,
      });
      console.log("Org Admin login successful:", res.data);
      // Store organization ID and other relevant info
      localStorage.setItem("orgId", res.data.orgId);
      localStorage.setItem("orgCode", res.data.orgCode);
      localStorage.setItem("email", res.data.email);
      window.location.href = "/organization-dashboard";
    } catch (err) {
      console.error("Org Admin login failed:", err);
      alert("Invalid Organization Admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">FF</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FeedbackFlow
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="org-admin" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="org-admin" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Organization</span>
                </TabsTrigger>
                <TabsTrigger value="super-admin" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Super Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="org-admin">
                <form onSubmit={handleOrgAdminLogin} className="space-y-4">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Organization Admin Login</span>
                    </CardTitle>
                    <CardDescription>
                      Sign in with your organization credentials
                    </CardDescription>
                  </CardHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="org-code">Organization Code</Label>
                      <Input
                        id="org-code"
                        type="text"
                        placeholder="Enter your organization code"
                        value={orgCode}
                        onChange={(e) => setOrgCode(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-email">Email Address</Label>
                      <Input
                        id="org-email"
                        type="email"
                        placeholder="admin@organization.com"
                        value={orgAdminEmail}
                        onChange={(e) => setOrgAdminEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-password">Password</Label>
                      <Input
                        id="org-password"
                        type="password"
                        placeholder="Enter your password"
                        value={orgAdminPassword}
                        onChange={(e) => setOrgAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Alert>
                    <Building2 className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Demo Credentials:</strong><br />
                      Code: <code className="text-xs bg-gray-100 px-1 rounded">HOSPITAL001</code><br />
                      Email: <code className="text-xs bg-gray-100 px-1 rounded">admin@cityhospital.com</code><br />
                      Password: <code className="text-xs bg-gray-100 px-1 rounded">demo123</code>
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Sign In to Organization
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="super-admin">
                <form onSubmit={handleSuperAdminLogin} className="space-y-4">
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Super Admin Login</span>
                    </CardTitle>
                    <CardDescription>
                      Platform administrator access
                    </CardDescription>
                  </CardHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="super-email">Email Address</Label>
                      <Input
                        id="super-email"
                        type="email"
                        placeholder="superadmin@feedbackflow.com"
                        value={superAdminEmail}
                        onChange={(e) => setSuperAdminEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="super-password">Password</Label>
                      <Input
                        id="super-password"
                        type="password"
                        placeholder="Enter your password"
                        value={superAdminPassword}
                        onChange={(e) => setSuperAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Demo Credentials:</strong><br />
                      Email: <code className="text-xs bg-gray-100 px-1 rounded">admin@feedbackflow.com</code><br />
                      Password: <code className="text-xs bg-gray-100 px-1 rounded">superadmin123</code>
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-purple-600">
                    Sign In as Super Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account? Contact your administrator
          </p>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
