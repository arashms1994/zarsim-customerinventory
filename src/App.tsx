import { useEffect } from 'react'
import { ONLINE_SHOP_LIST_CODE } from './api/base'
import { InventoryTable } from './components/InventoryTable'
import {
  useCurrentUser,
  useToken,
  useCustomersList,
  usePartList,
} from './hooks/useApi'

function App() {
  const {
    data: loginName,
    isLoading: loadingUser,
    error: errorUser,
  } = useCurrentUser()
  const {
    data: token,
    isLoading: loadingToken,
    error: errorToken,
  } = useToken()
  const {
    data: customersData,
    isLoading: loadingCustomers,
    error: errorCustomers,
  } = useCustomersList(loginName)
  const customerCode = customersData?.[0]?.CustomerCode
  const {
    data: partListData,
    isLoading: loadingPartList,
    error: errorPartList,
  } = usePartList(token, ONLINE_SHOP_LIST_CODE)
  const {
    data: customerData,
    isLoading: loadingParmis,
    error: errorParmis,
  } = usePartList(token, customerCode ? Number(customerCode) : undefined)

  const hasAnyTableData =
    (partListData?.length ?? 0) > 0 || (customerData?.length ?? 0) > 0
  const isInitialLoad =
    (loadingUser || loadingToken || loadingCustomers) ||
    ((loadingPartList || loadingParmis) && !hasAnyTableData)
  const tableData = [...(partListData ?? []), ...(customerData ?? [])]

  const error =
    errorUser || errorToken || errorCustomers || errorPartList || errorParmis

  useEffect(() => {
    if (partListData) console.log("[App] PartList data:", partListData)
    if (customerData) console.log("[App] ParmisList data:", customerData)
    if (loginName) console.log("[App] currentUser:", loginName)
    if (customersData) console.log("[App] customers:", customersData)
  }, [partListData, customerData, loginName, customersData])

  return (
    <div dir="rtl" className="min-w-[1200px] p-5 rounded-lg flex flex-col items-center justify-center text-right bg-neutral-300">
      <p className="font-semibold text-gray-700 text-xl">موجودی لحظه‌ای انبار</p>
      <div className="card">
        {error && (
          <p style={{ color: 'red' }}>
            {error instanceof Error ? error.message : String(error)}
          </p>
        )}
      </div>
      {(tableData.length > 0 || isInitialLoad) && (
        <div className="mt-6 w-full max-w-6xl">
          <InventoryTable data={tableData} isInitialLoad={isInitialLoad} />
        </div>
      )}
    </div>
  )
}

export default App
