import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Earning = {
  _id: string
  jobTitle: string
  amount: number
  date: string
}

const EarningsPage = () => {
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/earnings") // Replace with actual API
        setEarnings(res.data)
        const totalAmount = res.data.reduce((sum: number, earn: Earning) => sum + earn.amount, 0)
        setTotal(totalAmount)
      } catch (error) {
        console.error("Failed to fetch earnings:", error)
      }
    }

    fetchEarnings()
  }, [])

  return (
    <div className="min-h-screen bg-[#0c0f1c] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-orange-400 mb-6">💰 My Earnings</h2>

        <div className="mb-6 p-4 bg-[#1e233a] rounded-lg shadow-lg border border-[#2c314a]">
          <h3 className="text-lg font-semibold text-electric-blue mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-orange-400">Ksh {total.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnings.map((earning) => (
            <Card key={earning._id} className="bg-[#1a1f36] border border-[#2b2f4a]">
              <CardHeader>
                <CardTitle className="text-orange-300">{earning.jobTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Amount: <span className="text-green-400 font-semibold">Ksh {earning.amount.toLocaleString()}</span></p>
                <p className="text-sm text-gray-400">Date: {new Date(earning.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EarningsPage
