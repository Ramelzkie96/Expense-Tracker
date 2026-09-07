const chartData = [
  { day: "1", income: 8200, expense: 4100 },
  { day: "2", income: 8500, expense: 900 },
  { day: "3", income: 7800, expense: 5200 },
  { day: "4", income: 8200, expense: 3900 },
  { day: "5", income: 6200, expense: 3200 },
  { day: "6", income: 8500, expense: 900 },
  { day: "7", income: 4600, expense: 4500 },
  { day: "8", income: 4800, expense: 2600 },
  { day: "9", income: 6200, expense: 3000 },
  { day: "10", income: 5700, expense: 2400 },
  { day: "11", income: 5000, expense: 2800 },
  { day: "12", income: 4900, expense: 2100 },
  { day: "13", income: 5200, expense: 2500 },
  { day: "14", income: 6400, expense: 3200 },
  { day: "15", income: 5600, expense: 2800 },
  { day: "16", income: 6400, expense: 2700 },
  { day: "17", income: 5900, expense: 2500 },
  { day: "18", income: 8400, expense: 5000 },
  { day: "19", income: 6100, expense: 4600 },
  { day: "20", income: 2700, expense: 1900 },
  { day: "21", income: 5000, expense: 3000 },
  { day: "22", income: 3900, expense: 2600 },
  { day: "23", income: 2800, expense: 1800 },
  { day: "24", income: 4200, expense: 2300 },
  { day: "25", income: 5100, expense: 3200 },
  { day: "26", income: 8400, expense: 4600 },
  { day: "27", income: 5600, expense: 3500 },
  { day: "28", income: 4800, expense: 2400 },
  { day: "29", income: 4200, expense: 3000 },
  { day: "30", income: 5000, expense: 2600 },
];

const maxValue = 10000;

export default function IncomeExpenseChart() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}
      <div>
        <h2 className="text-base font-semibold text-slate-800">
          Income vs Expense
        </h2>

        {/* Legend */}
        <div className="mt-5 flex items-center gap-5">

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Income
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-red-500" />

            <span className="text-xs font-medium text-slate-600">
              Expense
            </span>
          </div>

        </div>
      </div>

      {/* ============================= */}
      {/* Chart + Summary */}
      {/* ============================= */}
      <div className="mt-4 flex gap-6">

        {/* ============================= */}
        {/* Chart */}
        {/* ============================= */}
        <div className="min-w-0 flex-1">

          <div className="flex">

            {/* Y Axis */}
            <div className="relative h-[190px] w-10 shrink-0">

              <div className="absolute -top-2 right-2 text-[10px] text-slate-500">
                ₱10K
              </div>

              <div className="absolute top-[35px] right-2 text-[10px] text-slate-500">
                ₱8K
              </div>

              <div className="absolute top-[72px] right-2 text-[10px] text-slate-500">
                ₱6K
              </div>

              <div className="absolute top-[108px] right-2 text-[10px] text-slate-500">
                ₱4K
              </div>

              <div className="absolute top-[145px] right-2 text-[10px] text-slate-500">
                ₱2K
              </div>

              <div className="absolute bottom-[-4px] right-2 text-[10px] text-slate-500">
                ₱0
              </div>

            </div>

            {/* Chart Area */}
            <div className="relative h-[190px] min-w-0 flex-1">

              {/* Grid Lines */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">

                <div className="border-t border-dashed border-gray-200" />

                <div className="border-t border-dashed border-gray-200" />

                <div className="border-t border-dashed border-gray-200" />

                <div className="border-t border-dashed border-gray-200" />

                <div className="border-t border-dashed border-gray-200" />

                <div className="border-t border-dashed border-gray-200" />

              </div>

              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-between gap-[2px] px-1">

                {chartData.map((item) => {

                  const incomeHeight =
                    (item.income / maxValue) * 100;

                  const expenseHeight =
                    (item.expense / maxValue) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 items-end justify-center gap-[2px]"
                    >

                      {/* Income */}
                      <div
                        className="w-[5px] rounded-t-sm bg-emerald-500 transition-all duration-300 hover:opacity-75"
                        style={{
                          height: `${incomeHeight}%`,
                        }}
                        title={`Sep ${item.day}: Income ₱${item.income.toLocaleString()}`}
                      />

                      {/* Expense */}
                      <div
                        className="w-[5px] rounded-t-sm bg-red-500 transition-all duration-300 hover:opacity-75"
                        style={{
                          height: `${expenseHeight}%`,
                        }}
                        title={`Sep ${item.day}: Expense ₱${item.expense.toLocaleString()}`}
                      />

                    </div>
                  );
                })}

              </div>

            </div>
          </div>

          {/* X Axis */}
          <div className="ml-10 mt-2 flex justify-between px-1">

            {[
              "Sep 1",
              "Sep 4",
              "Sep 7",
              "Sep 10",
              "Sep 13",
              "Sep 16",
              "Sep 19",
              "Sep 22",
              "Sep 25",
              "Sep 28",
              "Sep 30",
            ].map((label) => (
              <span
                key={label}
                className="text-[10px] text-slate-500"
              >
                {label}
              </span>
            ))}

          </div>

        </div>

        {/* ============================= */}
        {/* Summary Panel */}
        {/* ============================= */}
        <div className="flex w-[150px] shrink-0 items-center">

          <div className="w-full rounded-lg border border-gray-100 bg-slate-50/50 p-4">

            {/* Total Income */}
            <div>
              <p className="text-[11px] text-slate-500">
                Total Income
              </p>

              <p className="mt-1 text-sm font-semibold text-emerald-500">
                ₱45,000.00
              </p>
            </div>

            {/* Total Expenses */}
            <div className="mt-5">
              <p className="text-[11px] text-slate-500">
                Total Expenses
              </p>

              <p className="mt-1 text-sm font-semibold text-red-500">
                ₱16,550.00
              </p>
            </div>

            {/* Net Savings */}
            <div className="mt-5">
              <p className="text-[11px] text-slate-500">
                Net Savings
              </p>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                ₱28,450.00
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}