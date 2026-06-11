import StatCard from "./StatCard";
import StatusBadge from "./StatusBadge";

import {
  Package,
  CheckCircle2,
  Star,
  Navigation,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  weeklyData,
  deliveryHistory,
  statusData,
} from "../../../data/Riderdata";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* KPI Cards */}

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <StatCard
          icon={Package}
          label="Active Orders"
          value="12"
          sub="↑ 3 from yesterday"
          accent="#f97316"
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value="58"
          sub="This Week"
          accent="#22c55e"
        />

        <StatCard
          icon={Star}
          label="Rating"
          value="4.8"
          sub="50 Reviews"
          accent="#eab308"
        />

        <StatCard
          icon={Navigation}
          label="Distance Today"
          value="38 km"
          sub="142 km this week"
          accent="#3b82f6"
        />
      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Weekly Deliveries */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Weekly Deliveries</h3>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#f97316"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="95%"
                    stopColor="#f97316"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="deliveries"
                stroke="#f97316"
                fill="url(#gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Earnings Overview</h3>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="earnings"
                fill="#f97316"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deliveries + Pie Chart */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 20,
        }}
      >
        {/* Deliveries */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3>Today's Deliveries</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 16,
            }}
          >
            {deliveryHistory.map((delivery) => (
              <div
                key={delivery.id}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  padding: 14,
                  border: "1px solid #eee",
                  borderRadius: 12,
                }}
              >
                <div>
                  <strong>
                    {delivery.id}
                  </strong>

                  <p>
                    {delivery.customer}
                  </p>

                  <small>
                    {delivery.address}
                  </small>
                </div>

                <div>
                  <StatusBadge
                    status={
                      delivery.status
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3>Order Breakdown</h3>

          <ResponsiveContainer
            width="100%"
            height={220}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
              >
                {statusData.map(
                  (item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {statusData.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: 8,
              }}
            >
              <span>{item.name}</span>
              <strong>
                {item.value}%
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Insights */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3>
            <TrendingUp size={18} /> AI
            Insights
          </h3>

          <ul
            style={{
              marginTop: 16,
              lineHeight: 2,
            }}
          >
            <li>
              Deliveries increased 18%
              this week.
            </li>

            <li>
              Peak performance between
              10 AM - 2 PM.
            </li>

            <li>
              Customer ratings improved
              by 0.3 points.
            </li>

            <li>
              Suggested target:
              Complete 20 deliveries
              today.
            </li>
          </ul>
        </div>

        {/* Earnings Summary */}

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h3>
            <IndianRupee size={18} /> Monthly
            Summary
          </h3>

          <div
            style={{
              marginTop: 20,
            }}
          >
            <h1
              style={{
                fontSize: 42,
                color: "#f97316",
              }}
            >
              ₹28,540
            </h1>

            <p>
              Total Earnings This Month
            </p>

            <div
              style={{
                marginTop: 20,
              }}
            >
              <p>
                Deliveries: <b>247</b>
              </p>

              <p>
                Success Rate: <b>96%</b>
              </p>

              <p>
                Tips Earned:
                <b> ₹8,920</b>
              </p>

              <p>
                Ranking:
                <b> Top 5%</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;