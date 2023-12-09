
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {ThemeContext} from "../../Context";
import {useContext} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const BankModal = ({isOpen, onClose}) => {
    const banks = useSelector((state) => state?.banks?.bankData);
    const bankDataLoading = useSelector((state) => state?.banks?.bankDataLoading);

    const { theme } = useContext(ThemeContext);

    const percent = banks?.map((bank) => bank?.percent * 100).reduce((a, b) => a + b, 0);

    const loanTerms = banks?.map((bank) => bank?.loan_terms/12).reduce((a, b) => a + b, 0);

    //const maxCredit = banks?.map((bank) => bank?.max_credit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).reduce((a, b) => a + b, 0);

    //const maxCreditWithoutZeros = maxCredit?.replace(/^0+/, '');

    //console.log('banks', typeof banks, banks);

    const modalTitle = "Bank Details";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backdrop="blur"
            size="5xl"
        >
            <ModalContent className={`${theme ? 'dark-theme' : 'light-theme'} flex flex-col gap-4`}>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-3xl border-none text-dark">{modalTitle}</ModalHeader>
                        <ModalBody className='overflow-scroll'>
                            {bankDataLoading ? (
                                <LoadingSpinner />
                                ) : (
                                <div className="scrollable-list flex gap-4 flex-wrap">
                                    {banks?.map((bank, index) => (
                                        <div key={index}
                                             className="flex flex-col gap-2 border overflow-scroll border-gray-600 rounded-xl p-2 text-gray-600 text-sm hover:shadow-md hover:scale-100 hover:cursor-pointer">
                                            <div className="flex flex-row gap-1 items-center">
                                                <img src={bank?.image} className="h-10 w-10 rounded-full"/>
                                                <div className="font-semibold">{bank?.name}</div>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                                </svg>

                                                <div className="font-semibold">Bank rate:</div>
                                                <div>{percent}%</div>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                                                </svg>

                                                <div className="font-semibold">Initial Payment:</div>
                                                <div>{bank?.initial_payment} tenge</div>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>

                                                <div className="font-semibold">Loan Terms:</div>
                                                <div>{loanTerms} months</div>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                                                </svg>

                                                <div className="font-semibold">Limit Score:</div>
                                                <div>{bank?.limit_score}</div>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                                </svg>

                                                <div className="font-semibold">Max Credit:</div>
                                                <div>{bank?.max_credit} tenge</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter className="border-none">
                            <Button
                                variant="ghost"
                                color="error"
                                auto
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="success"
                                auto
                                onClick={onClose}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
};

export default BankModal;