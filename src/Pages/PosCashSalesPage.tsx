/* eslint-disable react-hooks/exhaustive-deps */
import "../style.css";
import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
  Input,
  Thead,
  Th,
  Tfoot,
  Button,
  Box,
  useDisclosure,
  HStack,
  Flex,
  Spacer,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";
import {
  StatsInt,
  MultiSelectOptionInt,
  ProductInt,
  SalesInt,
} from "../Interfaces";
import { CustomAlert, CustomAlertDialog } from "../Components";
import { currentUser, PosServices, ProductServices } from "../Services";
import moment from "moment";
import { FaPrint } from "react-icons/fa";

export const CashSalesPage = () => {
  const { onOpen, onClose, onToggle, isOpen } = useDisclosure();
  const submitDisclosure = useDisclosure();
  // const createCustomerDisclosure = useDisclosure();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isErrorAlert, setIsErrorAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const [selectedProductDataOption, setSelectedProductDataOption] = useState<
    any[]
  >([]);
  const [salesHistory, setSalesHistory] = useState<SalesInt[]>([]);
  const [products, setProducts] = useState<ProductInt[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductInt[]>([]);
  const [productsDataOptions, setProductsDataOptions] = useState<any[]>([]);

  const [subTotal, setSubTotal] = useState<number>(0.0);
  const [balance, setBalance] = useState<number>(0.0);
  const [amountPaid, setAmountPaid] = useState<number>(0.0);

  // const [customers,setCustomers] = useState<CustomerInt[]>([]);
  const [stats, setStats] = useState<StatsInt>({
    totalAmount: 0.0,
    salesCount: 0,
  });
  // const componentRef = useRef<any>();
  // const [customersDataOptions,setCustomersDataOptions] = useState<any[]>([]);
  // const [selectedCustomerDataOption,setSelectedCustomerDataOption] = useState<any[]>([]);

  // const handlePrint = async () =>{

  // }

  const handlePrint = async (data: SalesInt) => {
    const itemsData = data?.items || [];
    const itemsFormatted: any = [];
    itemsData.forEach((val, index, arr) => {
      itemsFormatted.push({
        item: val?.productName,
        qty: val?.quantity,
        price: parseFloat(`${val?.price || "0.0"}`).toFixed(2),
        amount: parseFloat(
          `${
            parseFloat(`${val?.price || "0.0"}`) *
            parseInt(`${val.quantity || 0}`, 10)
          }`
        ).toFixed(2),
      });
    });
    const _salesData = {
      metaData: {
        date:data?.createdAt,
        amountPaid:parseFloat(`${data?.amountPaid || "0.0"}`).toFixed(2),
        balance: parseFloat(`${data?.balance || "0.0"}`).toFixed(2),
        total: parseFloat(`${data?.subTotal || "0.0"}`).toFixed(2),
        subTotal: parseFloat(`${data?.subTotal || "0.0"}`).toFixed(2),
        reference: data?.reference,
        seller: currentUser().name,
      },
      products: itemsFormatted,
    };
     await PosServices.printSalesData(_salesData);

  };

  const formatSelected = () => {
    const selectedListCopy = [...selectedProductDataOption];
    const productData: ProductInt[] = [];
    selectedListCopy?.forEach((val) => {
      const _tempDataList = products?.filter((prod) => prod?.id === val?.key);
      if (_tempDataList?.length > 0) {
        productData?.push({
          ..._tempDataList[0],
          quantity: 1,
        });
      }
    });
    setSelectedProducts((_prev) => productData);
    calculateSubTotal(productData);
  };

  const changeQuantity = (index: number, qty?: string) => {
    const productsCopy = [...selectedProducts];
    if (
      qty === undefined ||
      qty === "" ||
      qty === "e" ||
      isNaN(parseInt(qty))
    ) {
      productsCopy[index].quantity = 0;
      setSelectedProducts((_prev) => productsCopy);
      return;
    }
    const convertedQuantity = parseInt(qty);
    productsCopy[index].quantity = convertedQuantity;
    setSelectedProducts((_prev) => productsCopy);
    calculateSubTotal(productsCopy);
  };

  const changePrice = (index: number, price?: string) => {
    const productsCopy = [...selectedProducts];
    if (
      price === undefined ||
      price === "" ||
      price === "e" ||
      isNaN(parseFloat(price))
    ) {
      productsCopy[index].price = 0;
      setSelectedProducts((_prev) => productsCopy);
      return;
    }
    const convertedPrice = parseFloat(price);
    productsCopy[index].price = convertedPrice;
    setSelectedProducts((_prev) => productsCopy);
    calculateSubTotal(productsCopy);
  };

  const calculateSubTotal = (_prods: ProductInt[]) => {
    let _subTotal = 0.0;
    _prods.forEach((prod) => {
      const rowTotal =
        parseInt(`${prod?.quantity || 0}`) *
          parseFloat(`${prod?.price || 0}`) || 0.0;
      _subTotal = _subTotal + rowTotal || 0.0;
    });
    setSubTotal((_subT) => _subTotal);
    // changeAmountPaid(`${amountPaid || 0}`);
  };

  const changeAmountPaid = (amt: string) => {
    if (
      amt === undefined ||
      amt === "" ||
      amt === "e" ||
      isNaN(parseFloat(amt))
    ) {
      setAmountPaid((_prev) => 0.0);
      // const _bal = 0 - subTotal;
      setBalance((_prev) => parseFloat(`${0}`));
      return;
    }
    const _amount = parseFloat(amt) || 0.0;
    setAmountPaid((_prev) => _amount);
    const _bal = _amount - subTotal;
    setBalance((_prev) => parseFloat(`${_bal}`));
  };

  const resetData = (prop: { isSubmit?: boolean }) => {
    setSelectedProductDataOption((_prev: any) => []);
    setBalance((_prev) => 0.0);
    setAmountPaid((_prev) => 0.0);
    // setSelectedCustomerDataOption((_prev)=>([]));
    if (!prop?.isSubmit) {
      onToggle();
    }
  };

  // const handleCustomerChange = (customerData:any[]) =>{
  //   if(!customerData) return;
  //   const selectedCustomerCopy:any[] = [];
  //   if(customerData?.length === 0){
  //     // setSelectedCustomerDataOption((_prev)=>(selectedCustomerCopy));
  //     return;
  //   }
  //   if(customerData?.length > 0){
  //     const index = customerData?.length - 1;
  //     const lastData = customerData[index];
  //     selectedCustomerCopy.push(lastData);
  //     // setSelectedCustomerDataOption((_prev)=>(selectedCustomerCopy));
  //     return ;
  //   }

  //   const lastData = customerData[0];
  //     selectedCustomerCopy.push(lastData);
  //     // setSelectedCustomerDataOption((_prev)=>(selectedCustomerCopy));

  // }

  const prepareDataForSubmit = () => {
    const productsSelectedCopy: ProductInt[] = [...selectedProducts];
    // const newProductQuantityCopy: ProductInt[] = [];
    // for (let prod of productsSelectedCopy) {
    //   const _prod: any = products?.filter((val) => val.id === prod?.id)?.at(0);
    //   newProductQuantityCopy.push({
    //     ..._prod,
    //     quantity:
    //       parseInt(`${_prod?.quantity || "0"}`, 10) -
    //       parseInt(`${prod?.quantity || "0"}`, 10),
    //   });
    // }
    const balanceCopy: number = amountPaid - subTotal;

    const salesData = {
      items: productsSelectedCopy,
      // products: newProductQuantityCopy,
      soldBy: currentUser()?.id,
      subTotal: parseFloat(`${subTotal || 0}`).toFixed(2),
      balance: parseFloat(`${balanceCopy}`).toFixed(2),
      amountPaid: parseFloat(`${amountPaid || 0}`).toFixed(2),
    };
    return salesData;
  };

  const showErrorMessage = (message: string) => {
    setMessage((_prev) => message);
    setIsErrorAlert((_prev) => (false));
    setShowAlert((_prev) => (true));
    setTimeout(() => {
      setMessage((_prev) => "");
      setIsErrorAlert((_prev) => (false));
      setShowAlert((_prev) => (false));
    }, 1500);
  };

  const isValid = (): boolean => {
    const _data = prepareDataForSubmit();

    // if(!_data?.customerId){
    //   showErrorMessage('Select or create a customer for this transaction!')
    //   return false;
    // }

    if (_data?.items?.length < 1) {
      showErrorMessage("No product have been selected.");
      return false;
    }

    if (!_data?.subTotal) {
      showErrorMessage("No transaction data found");
      return false;
    }

    if (!_data?.balance) {
      showErrorMessage("Balance must not be empty");
      return false;
    }

    if(parseFloat(`${_data?.subTotal || '0.0'}`) > parseFloat(`${_data?.amountPaid || '0.0'}`)){
      showErrorMessage("Payment must be made in full");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (isValid() === false) {
      return;
    }
    submitDisclosure.onToggle();
  };

  const submitData = async () => {
    const _data = prepareDataForSubmit();
    const result = await PosServices.postSales(_data);
    submitDisclosure.onToggle();
    setIsErrorAlert((_prev) => result.status === true);
    setMessage((_prev) => result?.message);
    setShowAlert((_prev) => !_prev);
    setTimeout(() => {
      if (result.status === true) {
        resetData({ isSubmit: true });
        getSalesStats(true);
      }
      setShowAlert((_prev) => !_prev);
    }, 1500);
  };

  const convertProductsToSelectable = (prods: any) => {
    const copyOriginalProducts = [...prods];
    const tempProdOptions: MultiSelectOptionInt[] = [];
    copyOriginalProducts?.forEach((_prod, index, arr) => {
      tempProdOptions.push({
        key: _prod?.id,
        label: _prod?.productName,
        value: _prod?.id,
        disabled: false,
      });
    });
    setProductsDataOptions((_prev) => tempProdOptions);
  };

  // const convertCustomersToSelectable = (customez:any) =>{
  //   const copyOriginalCustomers = [...customez];
  //   const tempCustomerOptions:MultiSelectOptionInt[] = [];
  //   copyOriginalCustomers?.forEach((_customer,index,arr)=>{
  //     tempCustomerOptions.push({
  //         key:_customer?.id,
  //         label:_customer?.name,
  //         value:_customer?.id,
  //         disabled:false
  //     });
  //   });
  //   setCustomersDataOptions((_prev)=>(tempCustomerOptions));

  // }

  const fetchRemoteData = async () => {
    const result = await ProductServices.getProducts({});
    if (result.status === true) {
      setProducts((_prev: any) => result?.data);
      convertProductsToSelectable(result?.data);
    }
    //  fetchCustomers();
  };

  // const fetchCustomers = async () =>{
  //   const customerResult = await CustomerService.getCustomers({});
  //    if(customerResult.status === true){
  //      setCustomers((_prev:any)=>(customerResult?.data));
  //      convertCustomersToSelectable(customerResult?.data);

  //    }
  // }

  const getSalesStats = async (isPrintable?:boolean) => {
    const date = moment().format("YYYY-MM-DD");
    const result = await PosServices.getPosStats({
      soldBy: currentUser()?.id,
      date,
    });
    if (result.status === true) {
      setStats((_prev) => result?.data);
    }

    const salesHist = await PosServices.getPosData({
      soldBy: currentUser()?.id,
      date,
    });

    if (salesHist?.status === true) {
      setSalesHistory((_prev) => salesHist?.data);
      if(isPrintable === true){
        if(salesHist?.data?.length > 0){
          handlePrint(salesHist?.data[salesHist?.data?.length - 1]);
        }
      }
    }
  };

  useEffect(() => {
    fetchRemoteData();
    getSalesStats();
    return () => {};
  }, []);

  useEffect(() => {
    formatSelected();

    return () => {};
  }, [selectedProductDataOption]);

  return (
    <Flex>
      <VStack minH={"100vh"} minW="60vw">
        <Collapse in={showAlert} animateOpacity>
          <CustomAlert message={message} isSuccess={isErrorAlert} />
        </Collapse>

        <HStack minW={700} color={"blackAlpha.800"} mb="5">
          <Box width={"full"}>
            <MultiSelect
              hasSelectAll={false}
              options={productsDataOptions}
              value={selectedProductDataOption}
              labelledBy={"Products"}
              onChange={setSelectedProductDataOption}
            />
          </Box>
        </HStack>

        <TableContainer minW={700}>
          <Table>
            <Thead>
              <Tr>
                <Th isNumeric>#</Th>
                <Th>Product</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedProducts?.map((prod, index, arr) => {
                return (
                  <Tr key={"row-credit-sales-key".concat(`${index}`)}>
                    <Td isNumeric>{index + 1}.</Td>
                    <Td>
                      <Text>{prod?.productName}</Text>
                    </Td>
                    <Td>
                      <Input
                        id={`quantity:${prod?.id}`}
                        textAlign={"end"}
                        type={"number"}
                        name="quantity"
                        placeholder="0.0"
                        onChange={(e) =>
                          changeQuantity(index, e.target.value || "0")
                        }
                        defaultValue={parseInt(`${prod?.quantity || 0}`)}
                      />
                    </Td>
                    <Td>
                      <Input
                        id={`price:${prod?.id}`}
                        textAlign={"end"}
                        type={"number"}
                        name="price"
                        placeholder="0.0"
                        onChange={(e) =>
                          changePrice(index, e.target.value || "0")
                        }
                        defaultValue={parseFloat(`${prod?.price || 0}`)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            {selectedProducts?.length !== 0 && (
              <Tfoot>
                <Tr>
                  <Th borderColor={"transparent"} colSpan={3} isNumeric>
                    <Text>Amount Paid GH&#162;</Text>
                  </Th>
                  <Th borderColor={"transparent"} isNumeric>
                    <Input
                      borderColor={"initial"}
                      placeholder="0.0"
                      textAlign={"end"}
                      type={"number"}
                      name="amountPaid"
                      onChange={(e) => changeAmountPaid(e.target.value)}
                    />
                  </Th>
                </Tr>
                {amountPaid > 0 && (
                  <Tr>
                    <Th borderColor={"transparent"} colSpan={3} isNumeric>
                      Balance
                    </Th>
                    <Th
                      borderColor={"transparent"}
                      color={balance < 0 ? "red" : "ButtonText"}
                      colSpan={0}
                      isNumeric
                    >
                      GH&#162; {parseFloat(`${balance || 0.0}`).toFixed(2)}
                    </Th>
                  </Tr>
                )}
                <Tr>
                  <Th borderColor={"transparent"} colSpan={3} isNumeric>
                    Subtotal
                  </Th>
                  <Th
                    borderColor={"transparent"}
                    color={"ButtonText"}
                    colSpan={0}
                    isNumeric
                  >
                    GH&#162; {parseFloat(`${subTotal}`)?.toFixed(2) || 0.0}
                  </Th>
                </Tr>
                <Tr borderColor={"transparent"}>
                  <Th colSpan={0} isNumeric>
                    <Button
                      onClick={onToggle}
                      isActive={false}
                      disabled={selectedProducts?.length === 0}
                    >
                      Cancel
                    </Button>
                  </Th>
                  <Th colSpan={3} isNumeric>
                    <Button
                      disabled={selectedProducts?.length === 0}
                      isActive={true}
                      onClick={handleSubmit}
                    >
                      Submit & Print Receipt
                    </Button>
                  </Th>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>

        {/* {createCustomerDisclosure.isOpen && <CustomerModalForCreateAndEdit isOpen={createCustomerDisclosure?.isOpen} onOpen={createCustomerDisclosure?.onOpen} onClose={createCustomerDisclosure?.onClose} onToggle={createCustomerDisclosure?.onToggle} data={undefined} callback={fetchCustomers} />} */}

        <CustomAlertDialog
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          onToggle={onToggle}
          message="Are you sure ?"
          title="Remove Data"
          callback={resetData}
          isDelete
        />

        <CustomAlertDialog
          onOpen={submitDisclosure?.onOpen}
          isOpen={submitDisclosure?.isOpen}
          onClose={submitDisclosure?.onClose}
          onToggle={submitDisclosure.onToggle}
          message="Are you sure ?"
          title="Submit Data"
          callback={submitData}
          buttonText={"Submit"}
        />
      </VStack>
      <VStack>
        <Flex>
          <VStack>
            <Text fontWeight={"bold"}>
              {parseFloat(`${stats?.totalAmount || 0.0}`).toFixed(2)}
            </Text>
            <Text>Amount(GH&#162;)</Text>
          </VStack>
          <Spacer minW={"10"} />
          <VStack>
            <Text fontWeight={"bold"}>
              {parseInt(`${stats?.salesCount || 0}`)}
            </Text>
            <Text>Sales(#)</Text>
          </VStack>
        </Flex>

        <Table>
          <Tbody>
            {salesHistory?.map((sale, index, arr) => (
              <Tr key={`credit-sales-history-${index}`}>
                <Td> {index + 1}.</Td>
                <Td> {sale?.reference}</Td>
                <Td>
                  &#162;{parseFloat(`${sale?.subTotal || 0.0}`).toFixed(2)}
                </Td>
                <Td>
                  <IconButton
                    onClick={() => handlePrint(sale)}
                    icon={<FaPrint />}
                    aria-label={"print"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Flex>
  );
};
