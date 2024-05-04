import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useDashboard } from "../../hooks/user-dashboard";
import BarChart from "../bar";
import PieChart from "../pie";
import KPI from "../kpi";

export const BaseDashboard: React.FC = () => {
  const { usersData, loading, barChart, pieChart, kpiData } = useDashboard();
  const {
    totalInactiveUsers,
    totalAdminUsers,
    totalGuestUsers,
    lastUsers,
  } = usersData;

  return (
    <Container sx={{marginTop: 8}}>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <Typography variant="h5" component="h2">
                    {totalInactiveUsers}
                  </Typography>
                  <Typography color="textSecondary">
                    Usuários inativos
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <Typography variant="h5" component="h2">
                    {totalAdminUsers}
                  </Typography>
                  <Typography color="textSecondary">Administradores</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <Typography variant="h5" component="h2">
                    {totalGuestUsers}
                  </Typography>
                  <Typography color="textSecondary">Convidados</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <Typography variant="h5" component="h2">
                    {lastUsers.total}
                  </Typography>
                  <Typography color="textSecondary">
                    Últimos novos usuários
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box sx={{display: 'flex', flex: 1}}>
                  <BarChart data={barChart}  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <PieChart data={pieChart} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  <KPI labels={kpiData?.labels} values={kpiData?.values}/>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      
      </Grid>
    </Container>
  );
};
