import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    // Simulation de données (en production, vous chargeriez depuis votre CSV)
    const generateData = () => {
      const sampleData = []
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
      
      months.forEach(month => {
        sampleData.push({
          month,
          tauxReussiteMigration: Math.floor(Math.random() * 30) + 70,
          tempsMigration: Math.floor(Math.random() * 40) + 10,
          tauxConformite: Math.floor(Math.random() * 20) + 80,
          reactiviteSupport: Math.floor(Math.random() * 25) + 75,
          satisfactionUtilisateurs: Math.floor(Math.random() * 40) + 60,
          respectDelaisCadrage: Math.floor(Math.random() * 30) + 70,
          respectDelaisParametrage: Math.floor(Math.random() * 35) + 65,
          respectDelaisTest: Math.floor(Math.random() * 30) + 70,
          incidentsPostVSR: Math.floor(Math.random() * 8) + 1,
          tempsReponseGlobal: (Math.random() * 4 + 0.5).toFixed(2)
        })
      })
      
      setData(sampleData)
      
      // Calcul des statistiques moyennes
      const avgStats = {
        tauxReussiteMigration: Math.round(sampleData.reduce((acc, item) => acc + item.tauxReussiteMigration, 0) / sampleData.length),
        tempsMigration: Math.round(sampleData.reduce((acc, item) => acc + item.tempsMigration, 0) / sampleData.length),
        tauxConformite: Math.round(sampleData.reduce((acc, item) => acc + item.tauxConformite, 0) / sampleData.length),
        reactiviteSupport: Math.round(sampleData.reduce((acc, item) => acc + item.reactiviteSupport, 0) / sampleData.length),
        satisfactionUtilisateurs: Math.round(sampleData.reduce((acc, item) => acc + item.satisfactionUtilisateurs, 0) / sampleData.length),
        incidentsPostVSR: Math.round(sampleData.reduce((acc, item) => acc + item.incidentsPostVSR, 0) / sampleData.length),
        tempsReponseGlobal: (sampleData.reduce((acc, item) => acc + parseFloat(item.tempsReponseGlobal), 0) / sampleData.length).toFixed(2)
      }
      
      setStats(avgStats)
    }
    
    generateData()
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const pieData = [
    { name: 'Cadrage/Conception', value: stats.respectDelaisCadrage || 0 },
    { name: 'Paramétrage', value: stats.respectDelaisParametrage || 0 },
    { name: 'Test', value: stats.respectDelaisTest || 0 }
  ]

  const processData = [
    { name: 'Processus A', temps: 1.2, performance: 95 },
    { name: 'Processus B', temps: 2.1, performance: 87 },
    { name: 'Processus C', temps: 0.8, performance: 98 },
    { name: 'Processus D', temps: 3.2, performance: 82 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Suivi PDA CAMUNDA
          </h1>
          <p className="text-lg text-gray-600">
            Suivi des indicateurs de performance et de integration
          </p>
        </div>

        {/* Cartes de KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Réussite Migration</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.tauxReussiteMigration}%</div>
              <Progress value={stats.tauxReussiteMigration} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps de Migration</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.tempsMigration} jours</div>
              <p className="text-xs text-muted-foreground mt-1">Durée moyenne</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.satisfactionUtilisateurs}%</div>
              <Progress value={stats.satisfactionUtilisateurs} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incidents Post-VSR</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.incidentsPostVSR}</div>
              <p className="text-xs text-muted-foreground mt-1">Nombre moyen</p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets pour les différentes vues */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="migration">Migration</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="delais">Délais</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Évolution des Indicateurs Clés</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="tauxReussiteMigration" stroke="#10B981" strokeWidth={2} name="Taux Réussite %" />
                      <Line type="monotone" dataKey="satisfactionUtilisateurs" stroke="#8B5CF6" strokeWidth={2} name="Satisfaction %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Répartition Respect des Délais par Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="migration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Taux de Réussite et Conformité</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tauxReussiteMigration" fill="#10B981" name="Taux Réussite %" />
                      <Bar dataKey="tauxConformite" fill="#3B82F6" name="Taux Conformité %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Temps de Migration</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="tempsMigration" stroke="#F59E0B" fill="#FEF3C7" name="Temps (jours)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Réactivité Support et Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="reactiviteSupport" stroke="#EF4444" strokeWidth={2} name="Réactivité Support %" />
                      <Line type="monotone" dataKey="satisfactionUtilisateurs" stroke="#8B5CF6" strokeWidth={2} name="Satisfaction %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Temps de Réponse par Processus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="temps" fill="#06B6D4" name="Temps (sec)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="delais" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Respect des Délais par Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="respectDelaisCadrage" fill="#10B981" name="Cadrage/Conception %" />
                      <Bar dataKey="respectDelaisParametrage" fill="#F59E0B" name="Paramétrage %" />
                      <Bar dataKey="respectDelaisTest" fill="#EF4444" name="Test %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Incidents Post-VSR</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="incidentsPostVSR" stroke="#DC2626" strokeWidth={3} name="Nombre d'incidents" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Résumé des performances */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Performance Globale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Excellente</div>
              <p className="text-green-100">Tous les indicateurs sont dans les objectifs</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Temps de Réponse Global</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.tempsReponseGlobal}s</div>
              <p className="text-blue-100">Temps moyen de réponse</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Conformité Générale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.tauxConformite}%</div>
              <p className="text-purple-100">Taux de conformité des livraisons</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

