const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const photographElement = document.getElementById("photo");
const imageElement = document.getElementById("image");
const explanationElement = document.getElementById("explanation");

let shuffledQuestions, currentQuestionIndex;
let shuffledAnswers;

Array.prototype.shuffle = function () {
  var i = this.length;
  while (i) {
    var j = Math.floor(Math.random() * i);
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

if (!("scramble" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "scramble", {
    enumerable: false,
    value: function () {
      var o,
        i,
        ln = this.length;
      while (ln--) {
        i = (Math.random() * (ln + 1)) | 0;
        o = this[ln];
        this[ln] = this[i];
        this[i] = o;
      }
      return this;
    },
  });
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // console.log(shuffledQuestions);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showExplanation(explanation) {
  explanationElement.innerText = `Explicatie: ${explanation.explanation}`;
  explanationElement.classList.remove("hide");
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  const scrambledQues = question.answers.scramble();
  scrambledQues.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (question.photograph) {
      photographElement.classList.remove("hide");
      imageElement.src = question.photograph;
    }

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  imageElement.src = "";
  explanationElement.classList.add("hide");
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    showExplanation(shuffledQuestions[currentQuestionIndex]);
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    showExplanation(shuffledQuestions[currentQuestionIndex]);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Which two traffic types use the Real-Time Transport Protocol (RTP)? (Choose two.)",
    answers: [
      { text: "video", correct: true },
      {
        text: "web",
        correct: false,
      },
      { text: "file transfer", correct: false },
      {
        text: "voice",
        correct: false,
      },
      {
        text: "peer to peer",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation:
      "",
  },
  {
    question:
      " Which wireless technology has low-power and data rate requirements making it popular in home automation applications?",
    answers: [
      { text: "ZigBee", correct: true },
      {
        text: "LoRaWAN",
        correct: false,
      },
      { text: "5G", correct: false },
      {
        text: "Wi-Fi",
        correct: false,
      },
    ],
    photograph: "",
    explanation:
      "ZigBee is an IEEE 802.15.4 wireless standard designed for creating personal-area networks. Low energy, power, and data rate requirements make Zigbee a popular protocol for connecting home automation devices.",
  },
  {
    question:
      "Which layer of the TCP/IP model provides a route to forward messages through an internetwork?",
    answers: [
      { text: "application", correct: false },
      {
        text: "network access",
        correct: false,
      },
      { text: "internet", correct: true },
      {
        text: "transport",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation: "The OSI model network layer corresponds directly to the internet layer of the TCP/IP model and is used to describe protocols that address and route messages through an internetwork.",
  },
  {
    question: "Which type of server relies on record types such as A, NS, AAAA, and MX in order to provide services?",
    answers: [
      {
        text: "DNS",
        correct: true,
      },
      {
        text: "email",
        correct: false,
      },
      {
        text: "file",
        correct: false,
      },
      {
        text: "web",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A DNS server stores records that are used to resolve IP addresses to host names. Some DNS record types include the following A – an end device IPv4 address NS – an authoritative name server AAAA – an end device IPv6 address MX – a mail exchange record",
  },
  {
    question:
      "What are proprietary protocols?",
    answers: [
      {
        text: "protocols developed by private organizations to operate on any vendor hardware",
        correct: false,
      },
      {
        text: "protocols that can be freely used by any organization or vendor",
        correct: false,
      },
      {
        text: "protocols developed by organizations who have control over their definition and operation",
        correct: true,
      },
      {
        text: "a collection of protocols known as the TCP/IP protocol suite",
        correct: false,
      },
    ],
    photograph: "",
    explanation:
      "Proprietary protocols have their definition and operation controlled by one company or vendor. Some of them can be used by different organizations with permission from the owner. The TCP/IP protocol suite is an open standard, not a proprietary protocol.",
  },
  {
    question:
      "What service is provided by DNS?",
    answers: [
      {
        text: "Resolves domain names, such as cisco.com, into IP addresses.",
        correct: true,
      },
      {
        text: "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
        correct: false,
      },
      {
        text: "Allows for data transfers between a client and a file server",
        correct: false,
      },
      {
        text: "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation:
      "",
  },
  {
    question:
      " A client packet is received by a server. The packet has a destination port number of 110. What service is the client requesting?",
    answers: [
      {
        text: "DNS",
        correct: false,
      },
      {
        text: "DHCP",
        correct: false,
      },
      {
        text: "SMTP",
        correct: false,
      },
      {
        text: "POP3",
        correct: true,
      },
    ],
    photograph:
      "",
    explanation:
      "",
  },
  {
    question:
      " A wired laser printer is attached to a home computer. That printer has been shared so that other computers on the home network can also use the printer. What networking model is in use?",
    answers: [
      {
        text: "client-based",
        correct: false,
      },
      {
        text: "master-slave",
        correct: false,
      },
      {
        text: "point-to-point",
        correct: false,
      },
      {
        text: "peer-to-peer (P2P)",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation: "Peer-to-peer (P2P) networks have two or more network devices that can share resources such as printers or files without having a dedicated server.",
  },
  {
    question:
      " What characteristic describes a virus?",
    answers: [
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "the use of stolen credentials to access private data",
        correct: false,
      },
      {
        text: "an attack that slows or crashes a device or network service",
        correct: false,
      },
      {
        text: "malicious software or code running on an end device",
        correct: true,
      },
    ],
    photograph:
      "",
    explanation:
      "",
  },
  {
    question:
      "Three bank employees are using the corporate network. The first employee uses a web browser to view a company web page in order to read some announcements. The second employee accesses the corporate database to perform some financial transactions. The third employee participates in an important live audio conference with other corporate managers in branch offices. If QoS is implemented on this network, what will be the priorities from highest to lowest of the different data types?",
    answers: [
      {
        text: "financial transactions, web page, audio conference",
        correct: false,
      },
      {
        text: "audio conference, financial transactions, web page",
        correct: true,
      },
      {
        text: "financial transactions, audio conference, web page",
        correct: false,
      },
      {
        text: "audio conference, web page, financial transactions",
        correct: false,
      },
    ],
    photograph: "",
    explanation:
      "QoS mechanisms enable the establishment of queue management strategies that enforce priorities for different categories of application data. Thus, this queuing enables voice data to have priority over transaction data, which has priority over web data.",
  },
  {
    question:
      "Asta n am mai implementat  =)))",
    answers: [
      {
        text: "https://itexamanswers.net/question/match-the-description-to-the-ipv6-addressing-component-not-all-options-are-used",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2020-03-26_171754.png?ezimgfmt=rs:734x459/rscb2/ng:webp/ngcb2",
    explanation:
      "https://itexamanswers.net/question/match-the-description-to-the-ipv6-addressing-component-not-all-options-are-used",
  },
  {
    question:
      "Refer to the exhibit. If Host1 were to transfer a file to the server, what layers of the TCP/IP model would be used?",
    answers: [
      {
        text: "only application and Internet layers",
        correct: false,
      },
      {
        text: "only Internet and network access layers",
        correct: false,
      },
      {
        text: "only application, Internet, and network access layers",
        correct: false,
      },
      {
        text: "application, transport, Internet, and network access layers",
        correct: true,
      },
      {
        text: "only application, transport, network, data link, and physical layers",
        correct: true,
      },
      {
        text: "application, session, transport, network, data link, and physical layers",
        correct: true,
      },
    ],
    photograph:
      "https://itexamanswers.net/wp-content/uploads/2016/03/i275370v1n1_275370-2.png?ezimgfmt=rs:525x358/rscb2/ng:webp/ngcb2",
    explanation: "",
  },
  {
    question:
      " Match the characteristic to the forwarding method. (Not all options are used.)",
    answers: [
      {
        text: "Uita te pe imagine",
        correct: false,
      },
    ],
    photograph:
      "https://itexamanswers.net/wp-content/uploads/2020/01/28.png?ezimgfmt=rs:734x562/rscb2/ng:webp/ngcb2",
    explanation:
      "Explanation: A store-and-forward switch always stores the entire frame before forwarding, and checks its CRC and frame length. A cut-through switch can forward frames before receiving the destination address field, thus presenting less latency than a store-and-forward switch. Because the frame can begin to be forwarded before it is completely received, the switch may transmit a corrupt or runt frame. All forwarding methods require a Layer 2 switch to forward broadcast frames.",
  },
  {
    question:
      "Refer to the exhibit. The IP address of which device interface should be used as the default gateway setting of host H1?",
    answers: [
      {
        text: "R1: S0/0/0",
        correct: false,
      },
      {
        text: "R2: S0/0/1",
        correct: false,
      },
      {
        text: "R1: G0/0",
        correct: true,
      },
      {
        text: "R2: S0/0/0",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/35.jpg?ezimgfmt=rs:579x387/rscb2/ng:webp/ngcb2",
    explanation:
      "Explanation: The default gateway for host H1 is the router interface that is attached to the LAN that H1 is a member of. In this case, that is the G0/0 interface of R1. H1 should be configured with the IP address of that interface in its addressing settings. R1 will provide routing services to packets from H1 that need to be forwarded to remote networks.      ",
  },
  {
    question:
      "What service is provided by Internet Messenger?",
    answers: [
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: true,
      },
      {
        text: "Allows remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "Resolves domain names, such as cisco.com, into IP addresses.",
        correct: false,
      },
      {
        text: "Uses encryption to provide secure remote access to network devices and servers.",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation:
      "",
  },
  {
    question:
      " Refer to the exhibit. Match the network with the correct IP address and prefix that will satisfy the usable host addressing requirements for each network.",
    answers: [
      {
        text: "https://itexamanswers.net/wp-content/uploads/2020/01/CCNA1-v7-ITN-IP-Addressing-Exam-Answers-003.png?ezimgfmt=rs:734x360/rscb2/ng:webp/ngcb2",
        correct: true,
      },
      
    ],
    photograph:
      "https://itexamanswers.net/wp-content/uploads/2020/01/i304956v6n1_207918.png?ezimgfmt=rs:595x401/rscb2/ng:webp/ngcb2",
    explanation:
      "Explanation: Network A needs to use 192.168.0.128 /25, which yields 128 host addresses. Network B needs to use 192.168.0.0 /26, which yields 64 host addresses. Network C needs to use 192.168.0.96 /27, which yields 32 host addresses. Network D needs to use 192.168.0.80/30, which yields 4 host addresses.",
  },
  {
    question:
      "Refer to the exhibit. Which protocol was responsible for building the table that is shown?",
    answers: [
      {
        text: "DHCP",
        correct: false,
      },
      {
        text: "ARP",
        correct: false,
      },
      {
        text: "DNS",
        correct: false,
      },
      {
        text: "ICMP",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-03-22_150538.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "",
  },
  {
    question: "A network administrator notices that some newly installed Ethernet cabling is carrying corrupt and distorted data signals. The new cabling was installed in the ceiling close to fluorescent lights and electrical equipment. Which two factors may interfere with the copper cabling and result in signal distortion and data corruption? (Choose two.)",
    answers: [
      {
        text: "crosstalk",
        correct: false,
      },
      {
        text: "extended length of cabling",
        correct: false,
      },
      {
        text: "RFI",
        correct: true,
      },
      {
        text: "EMI",
        correct: true,
      },
      {
        text: "signal attenuation",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      ". A host is trying to send a packet to a device on a remote LAN segment, but there are currently no mappings in its ARP cache. How will the device obtain a destination MAC address? A host is trying to send a packet to a device on a remote LAN segment, but there are currently no mappings in the ARP cache. How will the device obtain a destination MAC address?",
    answers: [
      {
        text: "It will send the frame and use its own MAC address as the destination.",
        correct: false,
      },
      {
        text: "It will send an ARP request for the MAC address of the destination device.",
        correct: false,
      },
      {
        text: "It will send the frame with a broadcast MAC address.",
        correct: false,
      },
      {
        text: "It will send a request to the DNS server for the destination MAC address.",
        correct: false,
      },
      {
        text: "It will send an ARP request for the MAC address of the default gateway.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "Which two functions are performed at the MAC sublayer of the OSI Data Link Layer to facilitate Ethernet communication? (Choose two.)",
    answers: [
      {
        text: "integrates Layer 2 flows between 10 Gigabit Ethernet over fiber and 1 Gigabit Ethernet over copper",
        correct: true,
      },
      {
        text: "enables IPv4 and IPv6 to utilize the same physical medium",
        correct: false,
      },
      {
        text: "handles communication between upper layer networking software and Ethernet NIC hardware",
        correct: false,
      },
      {
        text: "adds Ethernet control information to network protocol data",
        correct: false,
      },
      {
        text: "implements CSMA/CD over legacy shared half-duplex media",
        correct: true,
      },
    ],
    photograph:
      "",
    explanation:
     "",
    },
  {
    question:
      " A client packet is received by a server. The packet has a destination port number of 53. What service is the client requesting?",
    answers: [
      {
        text: "DNS",
        correct: true,
      },
      {
        text: "NetBIOS (NetBT)",
        correct: false,
      },
      {
        text: "POP3",
        correct: false,
      },
      {
        text: "IMAP",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation: "",
  },
  {
    question:
      " A network administrator is adding a new LAN to a branch office. The new LAN must support 25 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    answers: [
      {
        text: "255.255.255.128",
        correct: false,
      },
      {
        text: "255.255.255.192",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: true,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      " What characteristic describes a Trojan horse?",
    answers: [
      {
        text: "malicious software or code running on an end device",
        correct: true,
      },
      {
        text: "an attack that slows or crashes a device or network service",
        correct: false,
      },
      {
        text: "the use of stolen credentials to access private datah",
        correct: false,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation: "",
  },
  {
    question:
      "What service is provided by HTTPS?",
    answers: [
      {
        text: "Uses encryption to provide secure remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "Resolves domain names, such as cisco.com, into IP addresses.",
        correct: false,
      },
      {
        text: "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
        correct: true,
      },
      {
        text: "Allows remote access to network devices and servers.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      " A technician with a PC is using multiple applications while connected to the Internet. How is the PC able to keep track of the data flow between multiple application sessions and have each application receive the correct packet flows?",
    answers: [
      {
        text: "The data flow is being tracked based on the destination MAC address of the technician PC.",
        correct: false,
      },
      {
        text: "The data flow is being tracked based on the source port number that is used by each application.",
        correct: true,
      },
      {
        text: "The data flow is being tracked based on the source IP address that is used by the PC of the technician.",
        correct: false,
      },
      {
        text: "The data flow is being tracked based on the destination IP address that is used by the PC of the technician.",
        correct: false,
      },
    ],
    photograph: "",
    explanation:
      "Explanation: The source port number of an application is randomly generated and used to individually keep track of each session connecting out to the Internet. Each application will use a unique source port number to provide simultaneous communication from multiple applications through the Internet.",
  },
  {
    question:
      " A network administrator is adding a new LAN to a branch office. The new LAN must support 61 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    answers: [
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: false,
      },
      {
        text: "255.255.255.192",
        correct: true,
      },
      {
        text: "255.255.255.128",
        correct: false,
      },
    ],
    photograph: "",
    explanation:
     "",
  },
  {
    question:
      "Refer to the exhibit. Match the network with the correct IP address and prefix that will satisfy the usable host addressing requirements for each network. (Not all options are used.)",
    answers: [
      {
        text: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-11-07_115520.jpg?ezimgfmt=ng:webp/ngcb2",
        correct: true,
      },
    ],
    photograph:
      "https://itexamanswers.net/wp-content/uploads/2016/03/i207918v1n1_207918-1-1.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Network A needs to use 192.168.0.0 /25 which yields 128 host addresses.Network B needs to use 192.168.0.128 /26 which yields 64 host addresses.Network C needs to use 192.168.0.192 /27 which yields 32 host addresses.Network D needs to use 192.168.0.224 /30 which yields 4 host addresses.",
  },
  {
    question:
      "What characteristic describes a DoS attack?",
    answers: [
      {
        text: "the use of stolen credentials to access private data",
        correct: false,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "software that is installed on a user device and collects information about the user",
        correct: false,
      },
      {
        text: "an attack that slows or crashes a device or network service",
        correct: true,
      },
    ],
    photograph: "",
    explanation:
      "",
  },
  {
    question:
      "Match the application protocols to the correct transport protocols",
    answers: [
      {
        text: "Bafta.",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-09-18_110901.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation:
      "",
  },
  {
    question:
      " What service is provided by SMTP?",
    answers: [
      {
        text: "Allows clients to send email to a mail server and the servers to send email to other servers.",
        correct: true,
      },
      {
        text: "Allows remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "Uses encryption to provide secure remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
    ],
    photograph:
      "",
    explanation: "",
  },
  {
    question:
      "Which scenario describes a function provided by the transport layer?",
    answers: [
      {
        text: "A student is using a classroom VoIP phone to call home. The unique identifier burned into the phone is a transport layer address used to contact another network device on the same network.",
        correct: false,
      },
      {
        text: "A student is playing a short web-based movie with sound. The movie and sound are encoded within the transport layer header.",
        correct: false,
      },
      {
        text: "A student has two web browser windows open in order to access two web sites. The transport layer ensures the correct web page is delivered to the correct browser window.",
        correct: true,
      },
      {
        text: "A corporate worker is accessing a web server located on a corporate network. The transport layer formats the screen so the web page appears properly no matter what device is being used to view the web site.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The source and destination port numbers are used to identify the correct application and window within that application.",
  },
  {
    question: "Refer to the exhibit. Host B on subnet Teachers transmits a packet to host D on subnet Students. Which Layer 2 and Layer 3 addresses are contained in the PDUs that are transmitted from host B to the router?",
    answers: [
      {
        text: "Layer 2 destination address = 00-00-0c-94-36-ab Layer 2 source address = 00-00-0c-94-36-bb Layer 3 destination address = 172.16.20.200 Layer 3 source address = 172.16.10.200",
        correct: true,
      },
      {
        text: "Layer 2 destination address = 00-00-0c-94-36-dd Layer 2 source address = 00-00-0c-94-36-bb Layer 3 destination address = 172.16.20.200 Layer 3 source address = 172.16.10.200",
        correct: false,
      },
      {
        text: "Layer 2 destination address = 00-00-0c-94-36-cd Layer 2 source address = 00-00-0c-94-36-bb Layer 3 destination address = 172.16.20.99 Layer 3 source address = 172.16.10.200",
        correct: false,
      },
      {
        text: "Layer 2 destination address = 00-00-0c-94-36-ab Layer 2 source address = 00-00-0c-94-36-bb Layer 3 destination address = 172.16.20.200 Layer 3 source address = 172.16.100.200",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i204796v11n1_204796-TOPOLOGY-ARP.png?ezimgfmt=rs:647x245/rscb2/ng:webp/ngcb2",
    explanation:
      "",
  },
  {
    question:
      "What does the term “attenuation” mean in data communication?​",
    answers: [
      {
        text: "strengthening of a signal by a networking device",
        correct: false,
      },
      {
        text: "leakage of signals from one cable pair to another",
        correct: false,
      },
      {
        text: "time for a signal to reach its destination",
        correct: false,
      },
      {
        text: "loss of signal strength as distance increases",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "Refer to the exhibit. An administrator is trying to configure the switch but receives the error message that is displayed in the exhibit. What is the problem?",
    answers: [
      {
        text: "The entire command, configure terminal, must be used",
        correct: false,
      },
      {
        text: "The administrator is already in global configuration mode.",
        correct: false,
      },
      {
        text: "The administrator must first enter privileged EXEC mode before issuing the command.",
        correct: true,
      },
      {
        text: "The administrator must connect via the console port to access global configuration mode.",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i208399v1n1_Question-1.png?ezimgfmt=rs:308x55/rscb2/ng:webp/ngcb2",
    explanation: "",
  },
  {
    question:
      "Which two protocols operate at the top layer of the TCP/IP protocol suite? (Choose two.)",
    answers: [
      {
        text: "TCP",
        correct: false,
      },
      {
        text: "IP",
        correct: false,
      },
      {
        text: "UDP",
        correct: false,
      },
      {
        text: "POP",
        correct: true,
      },
      {
        text: "DNS",
        correct: true,
      },
      {
        text: "Ethernet",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "A company has a file server that shares a folder named Public. The network security policy specifies that the Public folder is assigned Read-Only rights to anyone who can log into the server while the Edit rights are assigned only to the network admin group. Which component is addressed in the AAA network service framework?",
    answers: [
      {
        text: "automation",
        correct: false,
      },
      {
        text: "accounting",
        correct: false,
      },
      {
        text: "authentication",
        correct: false,
      },
      {
        text: "authorization",
        correct: true,
      },
    ],
    photograph: "",
    explanation:
      "After a user is successfully authenticated (logged into the server), the authorization is the process of determining what network resources the user can access and what operations (such as read or edit) the user can perform.",
  },
  {
    question:
      " What three requirements are defined by the protocols used in network communcations to allow message transmission across a network? (Choose three.)",
    answers: [
      {
        text: "message size",
        correct: true,
      },
      {
        text: "message encoding",
        correct: true,
      },
      {
        text: "connector specifications.",
        correct: false,
      },
      {
        text: "media selection",
        correct: false,
      },
      {
        text: "delivery options",
        correct: true,
      },
      {
        text: "end-device installation",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "What are two characteristics of IP? (Choose two.)",
    answers: [
      {
        text: "does not require a dedicated end-to-end connection",
        correct: true,
      },
      {
        text: "operates independently of the network media",
        correct: true,
      },
      {
        text: "retransmits packets if errors occur",
        correct: false,
      },
      {
        text: "re-assembles out of order packets into the correct order at the receiver end",
        correct: false,
      },
      {
        text: "guarantees delivery of packets",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The Internet Protocol (IP) is a connectionless, best effort protocol. This means that IP requires no end-to-end connection nor does it guarantee delivery of packets. IP is also media independent, which means it operates independently of the network media carrying the packets.",
  },
  {
    question:
      "An employee of a large corporation remotely logs into the company using the appropriate username and password. The employee is attending an important video conference with a customer concerning a large sale. It is important for the video quality to be excellent during the meeting. The employee is unaware that after a successful login, the connection to the company ISP failed. The secondary connection, however, activated within seconds. The disruption was not noticed by the employee or other employees. What three network characteristics are described in this scenario? (Choose three.)",
    answers: [
      {
        text: "security",
        correct: true,
      },
      {
        text: "quality of service",
        correct: true,
      },
      {
        text: "scalability",
        correct: false,
      },
      {
        text: "powerline networking",
        correct: false,
      },
      {
        text: "integrity",
        correct: false,
      },
      {
        text: "fault tolerance",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "What are two common causes of signal degradation when using UTP cabling? (Choose two.)",
    answers: [
      {
        text: "improper termination",
        correct: true,
      },
      {
        text: "low-quality shielding in cable",
        correct: false,
      },
      {
        text: "installing cables in conduit",
        correct: false,
      },
      {
        text: "low-quality cable or connectors",
        correct: true,
      },
      {
        text: "loss of light over long distances",
        correct: false,
      },
    ],
    photograph: "",
    explanation: " When terminated improperly, each cable is a potential source of physical layer performance degradation.",
  },
  {
    question:
      " Which subnet would include the address 192.168.1.96 as a usable host address?",
    answers: [
      {
        text: "192.168.1.64/26",
        correct: true,
      },
      {
        text: "192.168.1.32/27",
        correct: false,
      },
      {
        text: "192.168.1.32/28",
        correct: false,
      },
      {
        text: "192.168.1.64/29",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "For the subnet of 192.168.1.64/26, there are 6 bits for host addresses, yielding 64 possible addresses. However, the first and last subnets are the network and broadcast addresses for this subnet. Therefore, the range of host addresses for this subnet is 192.168.1.65 to 192.168.1.126. The other subnets do not contain the address 192.168.1.96 as a valid host address.",
  },
  {
    question:
      "Refer to the exhibit. On the basis of the output, which two statements about network connectivity are correct? (Choose two.)",
    answers: [
      {
        text: "This host does not have a default gateway configured.",
        correct: false,
      },
      {
        text: "There are 4 hops between this device and the device at 192.168.100.1.",
        correct: true,
      },
      {
        text: "There is connectivity between this device and the device at 192.168.100.1.",
        correct: true,
      },
      {
        text: "The connectivity between these two hosts allows for videoconferencing calls.",
        correct: false,
      },
      {
        text: "The average transmission time between the two hosts is 2 milliseconds.",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i275429v1n1_chapter-9-WAN-images2.jpg?ezimgfmt=rs:481x148/rscb2/ng:webp/ngcb2",
    explanation: "The output displays a successful Layer 3 connection between a host computer and a host at 19.168.100.1. It can be determined that 4 hops exist between them and the average transmission time is 1 milliseconds. Layer 3 connectivity does not necessarily mean that an application can run between the hosts.",
  },
  {
    question:
      "Which two statements describe how to assess traffic flow patterns and network traffic types using a protocol analyzer? (Choose two.)",
    answers: [
      {
        text: "Capture traffic on the weekends when most employees are off work.",
        correct: false,
      },
      {
        text: "Capture traffic during peak utilization times to get a good representation of the different traffic types.",
        correct: true,
      },
      {
        text: "Only capture traffic in the areas of the network that receive most of the traffic such as the data center.",
        correct: false,
      },
      {
        text: "Perform the capture on different network segments.",
        correct: true,
      },
      {
        text: "Only capture WAN traffic because traffic to the web is responsible for the largest amount of traffic on a network.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "Traffic flow patterns should be gathered during peak utilization times to get a good representation of the different traffic types. The capture should also be performed on different network segments because some traffic will be local to a particular segment.",
  },
  {
    question:
      "What is the consequence of configuring a router with the ipv6 unicast-routing global configuration command?​",
    answers: [
      {
        text: "All router interfaces will be automatically activated.",
        correct: false,
      },
      {
        text: "The IPv6 enabled router interfaces begin sending ICMPv6 Router Advertisement messages.",
        correct: true,
      },
      {
        text: "Each router interface will generate an IPv6 link-local address.​",
        correct: false,
      },
      {
        text: "It statically creates a global unicast address on this router.​",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "Which three layers of the OSI model map to the application layer of the TCP/IP model? (Choose three.)",
    answers: [
      {
        text: "application",
        correct: true,
      },
      {
        text: "network",
        correct: false,
      },
      {
        text: "data link",
        correct: false,
      },
      {
        text: "session",
        correct: true,
      },
      {
        text: "presentation",
        correct: false,
      },
      {
        text: "transport",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The TCP/IP model consists of four layers: application, transport, internet, and network access. The OSI model consists of seven layers: application, presentation, session, transport, network, data link, and physical. The top three layers of the OSI model: application, presentation, and session map to the application layer of the TCP/IP model.",
  },
  {
    question:
      "Refer to the exhibit. If PC1 is sending a packet to PC2 and routing has been configured between the two routers, what will R1 do with the Ethernet frame header attached by PC1?",
    answers: [
      {
        text: "nothing, because the router has a route to the destination network",
        correct: false,
      },
      {
        text: "open the header and use it to determine whether the data is to be sent out S0/0/0",
        correct: false,
      },
      {
        text: "open the header and replace the destination MAC address with a new one",
        correct: false,
      },
      {
        text: "remove the Ethernet header and configure a new Layer 2 header before sending it out S0/0/0",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i271152v1n1_271152.png?ezimgfmt=rs:319x268/rscb2/ng:webp/ngcb2",
    explanation: "When PC1 forms the various headers attached to the data one of those headers is the Layer 2 header. Because PC1 connects to an Ethernet network, an Ethernet header is used. The source MAC address will be the MAC address of PC1 and the destination MAC address will be that of G0/0 on R1. When R1 gets that information, the router removes the Layer 2 header and creates a new one for the type of network the data will be placed onto (the serial link).",
  },
  {
    question:
      "What will happen if the default gateway address is incorrectly configured on a host?",
    answers: [
      {
        text: "The host cannot communicate with other hosts in the local network.",
        correct: false,
      },
      {
        text: "The host cannot communicate with hosts in other networks.",
        correct: true,
      },
      {
        text: "A ping from the host to 127.0.0.1 would not be successful.",
        correct: false,
      },
      {
        text: "The host will have to use ARP to determine the correct address of the default gateway.",
        correct: false,
      },
      {
        text: "The switch will not forward packets initiated by the host.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "What are two features of ARP? (Choose two.)",
    answers: [
      {
        text: "When a host is encapsulating a packet into a frame, it refers to the MAC address table to determine the mapping of IP addresses to MAC addresses.",
        correct: false,
      },
      {
        text: "An ARP request is sent to all devices on the Ethernet LAN and contains the IP address of the destination host and its multicast MAC address.",
        correct: false,
      },
      {
        text: "If a host is ready to send a packet to a local destination device and it has the IP address but not the MAC address of the destination, it generates an ARP broadcast.",
        correct: true,
      },
      {
        text: "If no device responds to the ARP request, then the originating node will broadcast the data packet to all devices on the network segment.",
        correct: false,
      },
      {
        text: "If a device receiving an ARP request has the destination IPv4 address, it responds with an ARP reply.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "A network administrator is adding a new LAN to a branch office. The new LAN must support 90 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    answers: [
      {
        text: "255.255.255.128",
        correct: true,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.248",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "What are two ICMPv6 messages that are not present in ICMP for IPv4? (Choose two.)",
    answers: [
      {
        text: "Neighbor Solicitation",
        correct: true,
      },
      {
        text: "Destination Unreachable",
        correct: false,
      },
      {
        text: "Host Confirmation",
        correct: false,
      },
      {
        text: "Time Exceeded",
        correct: false,
      },
      {
        text: "Router Advertisement",
        correct: true,
      },
      {
        text: "Route Redirection",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      " A client packet is received by a server. The packet has a destination port number of 80. What service is the client requesting?",
    answers: [
      {
        text: "DHCP",
        correct: false,
      },
      {
        text: "SMTP",
        correct: false,
      },
      {
        text: "DNS",
        correct: false,
      },
      {
        text: "HTTP",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "What is an advantage for small organizations of adopting IMAP instead of POP?",
    answers: [
      {
        text: "POP only allows the client to store messages in a centralized way, while IMAP allows distributed storage.",
        correct: false,
      },
      {
        text: "Messages are kept in the mail servers until they are manually deleted from the email client.",
        correct: true,
      },
      {
        text: "When the user connects to a POP server, copies of the messages are kept in the mail server for a short time, but IMAP keeps them for a long time",
        correct: false,
      },
      {
        text: "IMAP sends and retrieves email, but POP only retrieves email.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "IMAP and POP are protocols that are used to retrieve email messages. The advantage of using IMAP instead of POP is that when the user connects to an IMAP-capable server, copies of the messages are downloaded to the client application. IMAP then stores the email messages on the server until the user manually deletes those messages.",
  },
  {
    question:
      "A technician can ping the IP address of the web server of a remote company but cannot successfully ping the URL address of the same web server. Which software utility can the technician use to diagnose the problem?",
    answers: [
      {
        text: "tracert",
        correct: false,
      },
      {
        text: "ipconfig",
        correct: false,
      },
      {
        text: "netstat",
        correct: false,
      },
      {
        text: "nslookup",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "Traceroute (tracert) is a utility that generates a list of hops that were successfully reached along the path from source to destination.This list can provide important verification and troubleshooting information. The ipconfig utility is used to display the IP configuration settings on a Windows PC. The Netstat utility is used to identify which active TCP connections are open and running on a networked host. Nslookup is a utility that allows the user to manually query the name servers to resolve a given host name. This utility can also be used to troubleshoot name resolution issues and to verify the current status of the name servers.",
  },
  {
    question:
      "Which two functions are performed at the LLC sublayer of the OSI Data Link Layer to facilitate Ethernet communication? (Choose two.)",
    answers: [
      {
        text: "implements CSMA/CD over legacy shared half-duplex media",
        correct: false,
      },
      {
        text: "enables IPv4 and IPv6 to utilize the same physical medium",
        correct: true,
      },
      {
        text: "integrates Layer 2 flows between 10 Gigabit Ethernet over fiber and 1 Gigabit Ethernet over copper",
        correct: false,
      },
      {
        text: "implements a process to delimit fields within an Ethernet 2 frame",
        correct: false,
      },
      {
        text: "places information in the Ethernet frame that identifies which network layer protocol is being encapsulated by the frame",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "Vezi intrebarea 55 aici: https://itexamanswers.net/ccna-1-v7-0-final-exam-answers-full-introduction-to-networks.html",
  },
  {
    question:
      " The global configuration command ip default-gateway 172.16.100.1 is applied to a switch. What is the effect of this command?",
    answers: [
      {
        text: "The switch can communicate with other hosts on the 172.16.100.0 network.",
        correct: false,
      },
      {
        text: "The switch can be remotely managed from a host on another network.",
        correct: true,
      },
      {
        text: "The switch is limited to sending and receiving frames to and from the gateway 172.16.100.1",
        correct: false,
      },
      {
        text: "The switch will have a management interface with the address 172.16.100.1.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A default gateway address is typically configured on all devices to allow them to communicate beyond just their local network.In a switch this is achieved using the command ip default-gateway <ip address>.",
  },
  {
    question:
      "What happens when the transport input ssh command is entered on the switch vty lines?",
    answers: [
      {
        text: "The SSH client on the switch is enabled.",
        correct: false,
      },
      {
        text: "The switch requires a username/password combination for remote access",
        correct: false,
      },
      {
        text: "Communication between the switch and remote users is encrypted",
        correct: true,
      },
      {
        text: "The switch requires remote connections via a proprietary client software",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The transport input ssh command when entered on the switch vty (virtual terminal lines) will encrypt all inbound controlled telnet connections.",
  },
  {
    question:
      "Match the type of threat with the cause. (Not all options are used.)",
    answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-11-13_112035.jpg?ezimgfmt=ng:webp/ngcb2",
  },
  {
    question:
      "A disgruntled employee is using some free wireless networking tools to determine information about the enterprise wireless networks. This person is planning on using this information to hack the wireless network. What type of attack is this?",
    answers: [
      {
        text: "DoS",
        correct: false,
      },
      {
        text: "access",
        correct: false,
      },
      {
        text: "reconnaissance",
        correct: true,
      },
      {
        text: "Trojan horse",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A reconnaissance attack is the unauthorized discovery and documentation of various computing networks, network systems, resources, applications, services, or vulnerabilities.",
  },
  {
    question:
      "What service is provided by HTTP?",
    answers: [
      {
        text: "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
        correct: false,
      },
      {
        text: "Allows for data transfers between a client and a file server.",
        correct: false,
      },
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
      {
        text: "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  },
  {
    question:
      "A client packet is received by a server. The packet has a destination port number of 67. What service is the client requesting?",
    answers: [
      {
        text: "FTP",
        correct: false,
      },
      {
        text: "DHCP",
        correct: true,
      },
      {
        text: "Telnet",
        correct: false,
      },
      {
        text: "SSH",
        correct: false,
      },
      {
        text: "",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "What are two problems that can be caused by a large number of ARP request and reply messages? (Choose two.)",
    answers: [
      {
        text: "Switches become overloaded because they concentrate all the traffic from the attached subnets.",
        correct: false,
      },
      {
        text: "The ARP request is sent as a broadcast, and will flood the entire subnet.",
        correct: true,
      },
      {
        text: "The network may become overloaded because ARP reply messages have a very large payload due to the 48-bit MAC address and 32-bit IP address that they contain.",
        correct: false,
      },
      {
        text: "A large number of ARP request and reply messages may slow down the switching process, leading the switch to make many changes in its MAC table.",
        correct: false,
      },
      {
        text: "All ARP request messages must be processed by all nodes on the local network.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "ARP requests are sent as broadcasts:(1) All nodes will receive them, and they will be processed by software, interrupting the CPU. (2) The switch forwards (floods) Layer 2 broadcasts to all ports. A switch does not change its MAC table based on ARP request or reply messages. The switch populates the MAC table using the source MAC address of all frames. The ARP payload is very small and does not overload the switch.",
  },{
    question:
      "A group of Windows PCs in a new subnet has been added to an Ethernet network. When testing the connectivity, a technician finds that these PCs can access local network resources but not the Internet resources. To troubleshoot the problem, the technician wants to initially confirm the IP address and DNS configurations on the PCs, and also verify connectivity to the local router. Which three Windows CLI commands and utilities will provide the necessary information? (Choose three.)",
    answers: [
      {
        text: "netsh interface ipv6 show neighbor",
        correct: false,
      },
      {
        text: "arp -a",
        correct: false,
      },
      {
        text: "tracert",
        correct: false,
      },
      {
        text: "ping",
        correct: true,
      },
      {
        text: "ipconfig",
        correct: true,
      },
      {
        text: "nslookup",
        correct: true,
      },
      {
        text: "telnet",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "During the process of forwarding traffic, what will the router do immediately after matching the destination IP address to a network on a directly connected routing table entry?",
    answers: [
      {
        text: "analyze the destination IP address",
        correct: false,
      },
      {
        text: "switch the packet to the directly connected interface",
        correct: true,
      },
      {
        text: "look up the next-hop address for the packet",
        correct: false,
      },
      {
        text: "discard the traffic after consulting the route table",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "What characteristic describes antispyware?",
    answers: [
      {
        text: "applications that protect end devices from becoming infected with malicious software",
        correct: true,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "software on a router that filters traffic based on IP addresses or applications",
        correct: false,
      },
      {
        text: "a tunneling protocol that provides remote users with secure access into the network of an organization",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      " A network administrator needs to keep the user ID, password, and session contents private when establishing remote CLI connectivity with a switch to manage it. Which access method should be chosen?",
    answers: [
      {
        text: "Telnet",
        correct: false,
      },
      {
        text: "AUX",
        correct: false,
      },
      {
        text: "SSH",
        correct: true,
      },
      {
        text: "Console",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "What are the two most effective ways to defend against malware? (Choose two.)",
    answers: [
      {
        text: "Implement a VPN.",
        correct: false,
      },
      {
        text: "Implement network firewalls.",
        correct: false,
      },
      {
        text: "Implement RAID.",
        correct: false,
      },
      {
        text: "Implement strong passwords.",
        correct: false,
      },
      {
        text: "Update the operating system and other application software.",
        correct: true,
      },
       {
        text: "Install and update antivirus software.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "A cybersecurity specialist must be aware of the technologies and measures that are used as countermeasures to protect the organization from threats and vulnerabilities.",
  },{
    question:
      "Which type of security threat would be responsible if a spreadsheet add-on disables the local software firewall?",
    answers: [
      {
        text: "brute-force attack",
        correct: false,
      },
      {
        text: "Trojan horse",
        correct: true,
      },
      {
        text: "DoS",
        correct: false,
      },
      {
        text: "buffer overflow",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A Trojan horse is software that does something harmful, but is hidden in legitimate software code. A denial of service (DoS) attack results in interruption of network services to users, network devices, or applications. A brute-force attack commonly involves trying to access a network device. A buffer overflow occurs when a program attempts to store more data in a memory location than it can hold.",
  },{
    question:
      "Which frame field is created by a source node and used by a destination node to ensure that a transmitted data signal has not been altered by interference, distortion, or signal loss?",
    answers: [
      {
        text: "User Datagram Protocol field",
        correct: false,
      },
      {
        text: "transport layer error check field",
        correct: false,
      },
      {
        text: "flow control field",
        correct: false,
      },
      {
        text: "frame check sequence field",
        correct: true,
      },
      {
        text: "error correction process field",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "A network administrator is adding a new LAN to a branch office. The new LAN must support 4 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    answers: [
      {
        text: "255.255.255.248",
        correct: true,
      },
      {
        text: "255.255.255.0",
        correct: false,
      },
      {
        text: "255.255.255.128",
        correct: false,
      },
      {
        text: "255.255.255.192",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  },{
    question:
      "What service is provided by POP3?",
    answers: [
      {
        text: "Retrieves email from the server by downloading the email to the local mail application of the client.",
        correct: true,
      },
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
      {
        text: "Allows remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "Uses encryption to provide secure remote access to network devices and servers.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What two security solutions are most likely to be used only in a corporate environment? (Choose two.)",
    answers: [
      {
        text: "antispyware", 
        correct: false,
      },
      {
        text: "virtual private networks",
        correct: true,
      },
      {
        text: "intrusion prevention systems",
        correct: true,
      },
      {
        text: "strong passwords",
        correct: false,
      },
      {
        text: "antivirus software",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What characteristic describes antivirus software?",
      answers: [
      {
        text: "applications that protect end devices from becoming infected with malicious software",
        correct: true,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "a tunneling protocol that provides remote users with secure access into the network of an organization",
        correct: false,
      },
      {
        text: "software on a router that filters traffic based on IP addresses or applications",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What mechanism is used by a router to prevent a received IPv4 packet from traveling endlessly on a network?",
      answers: [
      {
        text: "It checks the value of the TTL field and if it is 0, it discards the packet and sends a Destination Unreachable message to the source host.",
        correct: false,
      },
      {
        text: "It checks the value of the TTL field and if it is 100, it discards the packet and sends a Destination Unreachable message to the source host.",
        correct: false,
      },
      {
        text: "It decrements the value of the TTL field by 1 and if the result is 0, it discards the packet and sends a Time Exceeded message to the source host.",
        correct: true,
      },
      {
        text:"It increments the value of the TTL field by 1 and if the result is 100, it discards the packet and sends a Parameter Problem message to the source host.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "A client packet is received by a server. The packet has a destination port number of 69. What service is the client requesting?",
      answers: [
      {
        text: "DNS",
        correct: false,
      },
      {
        text: "DHCP",
        correct: false,
      },
      {
        text: "TFTP",
        correct: true,
      },
      {
        text:"SMTP",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "An administrator defined a local user account with a secret password on router R1 for use with SSH. Which three additional steps are required to configure R1 to accept only encrypted SSH connections? (Choose three.)",
      answers: [
      {
        text: "Configure DNS on the router.",
        correct: false,
      },
      {
        text: "Generate two-way pre-shared keys.",
        correct: false,
      },
      {
        text: "Configure the IP domain name on the router.",
        correct: true,
      },
      {
        text:"Generate the SSH keys.",
        correct: true,
      },
      {
        text:"Enable inbound vty SSH sessions."
        ,correct: true,
      },
      {
        text:"Enable inbound vty Telnet sessions.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "Which two functions are performed at the MAC sublayer of the OSI Data Link Layer to facilitate Ethernet communication? (Choose two.)",
      answers: [
      {
        text: "places information in the Ethernet frame that identifies which network layer protocol is being encapsulated by the frame",
        correct: true,
      },
      {
        text: "adds Ethernet control information to network protocol data",
        correct: false,
      },
      {
        text: "responsible for internal structure of Ethernet frame",
        correct: false,
      },
      {
        text:"enables IPv4 and IPv6 to utilize the same physical medium",
        correct: false,
      },
      {
        text:"implements trailer with frame check sequence for error detection",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What are the three parts of an IPv6 global unicast address? (Choose three.)",
      answers: [
      {
        text: "subnet ID",
        correct: true,
      },
      {
        text: "subnet mask",
        correct: false,
      },
      {
        text: "broadcast address",
        correct: false,
      },
      {
        text:"global routing prefix",
        correct: true,
      },
      {
        text:"interface ID",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "A network administrator is designing the layout of a new wireless network. Which three areas of concern should be accounted for when building a wireless network? (Choose three.)",
      answers: [
      {
        text: "extensive cabling",
        correct: false,
      },
      {
        text: "mobility options",
        correct: false,
      },
      {
        text: "packet collision",
        correct: false,
      },
      {
        text:"interference",
        correct: true,
      },
      {
        text:"security",
        correct: true,
      },
      {
        text:"coverage area",
        correct: true,
      },
    ],
    photograph: "",
    explanation: " The three areas of concern for wireless networks focus on the size of the coverage area, any nearby interference, and providing network security. Extensive cabling is not a concern for wireless networks, as a wireless network will require minimal cabling for providing wireless access to hosts. Mobility options are not a component of the areas of concern for wireless networks.",
  }, {
    question:
      "A new network administrator has been asked to enter a banner message on a Cisco device. What is the fastest way a network administrator could test whether the banner is properly configured?",
      answers: [
      {
        text: "Enter CTRL-Z at the privileged mode prompt.",
        correct: false,
      },
      {
        text: "Exit global configuration mode.",
        correct: false,
      },
      {
        text: "Power cycle the device.",
        correct: false,
      },
      {
        text:"Reboot the device.",
        correct: false,
      },
      {
        text:"Exit privileged EXEC mode and press Enter .",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What method is used to manage contention-based access on a wireless network?",
      answers: [
      {
        text: "token passing",
        correct: false,
      },
      {
        text: "CSMA/CA",
        correct: true,
      },
      {
        text: "priority ordering",
        correct: false,
      },
      {
        text:"CSMA/CD",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What is a function of the data link layer?",
      answers: [
      {
        text: "provides the formatting of data",
        correct: false,
      },
      {
        text: "provides end-to-end delivery of data between hosts",
        correct: false,
      },
      {
        text: "provides delivery of data between two applications",
        correct: false,
      },
      {
        text:"provides for the exchange of frames over a common local media",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What is the purpose of the TCP sliding window?",
      answers: [
      {
        text: "to ensure that segments arrive in order at the destination",
        correct: false,
      },
      {
        text: "to end communication when data transmission is complete",
        correct: false,
      },
      {
        text: "to inform a source to retransmit data from a specific point forward",
        correct: false,
      },
      {
        text:"to request that a source decrease the rate at which it transmits data",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "The TCP sliding window allows a destination device to inform a source to slow down the rate of transmission. To do this, the destination device reduces the value contained in the window field of the segment. It is acknowledgment numbers that are used to specify retransmission from a specific point forward. It is sequence numbers that are used to ensure segments arrive in order. Finally, it is a FIN control bit that is used to end a communication session.",
  }, {
    question:
      "What characteristic describes spyware?",
      answers: [
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "an attack that slows or crashes a device or network service",
        correct: false,
      },
      {
        text: "the use of stolen credentials to access private data",
        correct: false,
      },
      {
        text:"software that is installed on a user device and collects information about the user",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "Which switching method drops frames that fail the FCS check?",
      answers: [
      {
        text: "borderless switching",
        correct: false,
      },
      {
        text: "ingress port buffering",
        correct: false,
      },
      {
        text: "cut-through switching",
        correct: false,
      },
      {
        text:"store-and-forward switching",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "Which range of link-local addresses can be assigned to an IPv6-enabled interface?",
      answers: [
      {
        text: "FEC0::/10",
        correct: false,
      },
      {
        text: "FDEE::/7",
        correct: false,
      },
      {
        text: "FF00::/8",
        correct: false,
      },
      {
        text:"FE80::/10",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "Link-local addresses are in the range of FE80::/10 to FEBF::/10. The original IPv6 specification defined site-local addresses and used the prefix range FEC0::/10, but these addresses were deprecated by the IETF in favor of unique local addresses. FDEE::/7 is a unique local address because it is in the range of FC00::/7 to FDFF::/7. IPv6 multicast addresses have the prefix FF00::/8.",
  }, {
    question:
      "What service is provided by FTP?",
      answers: [
      {
        text: "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
        correct: false,
      },
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
      {
        text: "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
        correct: false,
      },
      {
        text:"Allows for data transfers between a client and a file server.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "A user is attempting to access http://www.cisco.com/ without success. Which two configuration values must be set on the host to allow this access? (Choose two.)",
      answers: [
      {
        text: "DNS server",
        correct: true,
      },
      {
        text: "source port number",
        correct: false,
      },
      {
        text: "HTTP server",
        correct: false,
      },
      {
        text: "source MAC address",
        correct: false,
      },
      {
        text:"default gateway",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Which two statements accurately describe an advantage or a disadvantage when deploying NAT for IPv4 in a network? (Choose two.)",
      answers: [
      {
        text: "NAT adds authentication capability to IPv4.",
        correct: false,
      },
      {
        text: "NAT introduces problems for some applications that require end-to-end connectivity.",
        correct: true,
      },
      {
        text: "NAT will impact negatively on switch performance.",
        correct: false,
      },
      {
        text: "NAT provides a solution to slow down the IPv4 address depletion.",
        correct: true,
      },
      {
        text:"NAT improves packet handling.",
        correct: false,
      },
      {
        text:"NAT causes routing tables to include more information.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "Network Address Translation (NAT) is a technology that is implemented within IPv4 networks. One application of NAT is to use private IP addresses inside a network and use NAT to share a few public IP addresses for many internal hosts. In this way it provides a solution to slow down the IPv4 address depletion. However, since NAT hides the actual IP addresses that are used by end devices, it may cause problems for some applications that require end-to-end connectivity."
  }, {
    question:
      "What would be the interface ID of an IPv6 enabled interface with a MAC address of 1C-6F-65-C2-BD-F8 when the interface ID is generated by using the EUI-64 process?",
      answers: [
      {
        text: "0C6F:65FF:FEC2:BDF8",
        correct: false,
      },
      {
        text: "1E6F:65FF:FEC2:BDF8",
        correct: true,
      },
      {
        text: "C16F:65FF:FEC2:BDF8",
        correct: false,
      },
      {
        text: "106F:65FF:FEC2:BDF8",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "To derive the EUI-64 interface ID by using the MAC address 1C-6F-65-C2-BD-F8, three steps are taken. Change the seventh bit of the MAC address from a binary 0 to a binary 1 which changes the hex C, into a hex E. Insert hex digits FFFE into the middle of the address. Rewrite the address in IPv6 format. The three steps, when complete, give the interface ID of 1E6F:65FF:FEC2:BDF8."
  }, {
    question:
      "Refer to the exhibit. PC1 issues an ARP request because it needs to send a packet to PC2. In this scenario, what will happen next?",
      answers: [
      {
        text: "SW1 will send an ARP reply with the SW1 Fa0/1 MAC address.​",
        correct: false,
      },
      {
        text: "PC2 will send an ARP reply with the PC2 MAC address.",
         correct: true,
      },
      {
        text: "SW1 will send an ARP reply with the PC2 MAC address.​",
        correct: false,
      },
      {
        text: "RT1 will send an ARP reply with the PC2 MAC address.​",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2016/03/i209824v1n1_209824.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "When a network device wants to communicate with another device on the same network, it sends a broadcast ARP request. In this case, the request will contain the IP address of PC2. The destination device (PC2) sends an ARP reply with its MAC address."
  }, {
    question:
      "What service is provided by BOOTP?",
      answers: [
      {
        text: "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
        correct: false,
      },
      {
        text: "Legacy application that enables a diskless workstation to discover its own IP address and find a BOOTP server on the network.",
        correct: true,
      },
      {
        text: "Allows for data transfers between a client and a file server.",
        correct: false,
      },
      {
        text: "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What characteristic describes adware?",
      answers: [
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
      {
        text: "software that is installed on a user device and collects information about the user",
        correct: true,
      },
      {
        text: "the use of stolen credentials to access private data",
        correct: false,
      },
      {
        text: "an attack that slows or crashes a device or network service",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "When a switch configuration includes a user-defined error threshold on a per-port basis, to which switching method will the switch revert when the error threshold is reached?",
      answers: [
      {
        text: "cut-through",
        correct: false,
      },
      {
        text: "store-and-forward",
        correct: true,
      },
      {
        text: "fast-forward",
        correct: false,
      },
      {
        text: "fragment-free",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Match a statement to the related network model. (Not all options are used.)",
      answers: [
      {
        text: "no dedicated server is required",
        correct: true,
      },
      {
        text: "client and server roles are set on a per request basis",
        correct: true,
      },
      {
        text: "peer-to-peer aplication",
        correct: false,
      },
      {
        text: "requires a specific user interface",
        correct: true,
      },
      {
        text: " a background service is required",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2022-05-12_101113.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Peer-to-peer networks do not require the use of a dedicated server, and devices can assume both client and server roles simultaneously on a per request basis. Because they do not require formalized accounts or permissions, they are best used in limited situations. Peer-to-peer applications require a user interface and background service to be running, and can be used in more diverse situations."
  }, {
    question:
      "What are two primary responsibilities of the Ethernet MAC sublayer? (Choose two.)",
      answers: [
      {
        text: "error detection",
        correct: false,
      },
      {
        text: "accessing the media",
        correct: true,
      },
      {
        text: "frame delimiting",
        correct: false,
      },
      {
        text: "logical addressing",
        correct: false,
      },
      {
        text: "data encapsulation",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Match each type of frame field to its function. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/11.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "What is the subnet ID associated with the IPv6 address 2001:DA48:FC5:A4:3D1B::1/64?",
      answers: [
      {
        text: "2001:DA48::/64​",
        correct: false,
      },
      {
        text: "2001:DA48:FC5::A4:/64​",
        correct: false,
      },
      {
        text: "2001:DA48:FC5:A4::/64​",
        correct: true,
      },
      {
        text: "2001::/64",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      " Match the firewall function to the type of threat protection it provides to the network. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/18.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Firewall products come packaged in various forms. These products use different techniques for determining what will be permitted or denied access to a network. They include the following: Packet filtering – Prevents or allows access based on IP or MAC addresses + Application filtering – Prevents or allows access by specific application types based on port numbers + URL filtering – Prevents or allows access to websites based on specific URLs or keywords + Stateful packet inspection (SPI) – Incoming packets must be legitimate responses to requests from internal hosts. Unsolicited packets are blocked unless permitted specifically. SPI can also include the capability to recognize and filter out specific types of attacks, such as denial of service (DoS)"
  }, {
    question:
      "Users are reporting longer delays in authentication and in accessing network resources during certain time periods of the week. What kind of information should network engineers check to find out if this situation is part of a normal network behavior?",
      answers: [
      {
        text: "syslog records and messages",
        correct: false,
      },
      {
        text: "debug output and packet captures",
        correct: false,
      },
      {
        text: "the network performance baseline",
        correct: true,
      },
      {
        text: "network configuration files",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "How does the service password-encryption command enhance password security on Cisco routers and switches?",
      answers: [
      {
        text: "It requires encrypted passwords to be used when connecting remotely to a router or switch with Telnet.",
        correct: false,
      },
      {
        text: "It requires that a user type encrypted passwords to gain console access to a router or switch.",
        correct: false,
      },
      {
        text: "It encrypts passwords that are stored in router or switch configuration files.",
        correct: true,
      },
      {
        text: "It encrypts passwords as they are sent across the network.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The service password-encryption command encrypts plaintext passwords in the configuration file so that they cannot be viewed by unauthorized users."
  }, {
    question:
      "Which two statements are correct in a comparison of IPv4 and IPv6 packet headers? (Choose two.)",
      answers: [
      {
        text: "The Source Address field name from IPv4 is kept in IPv6.",
        correct: true,
      },
      {
        text: "The Version field from IPv4 is not kept in IPv6.",
        correct: false,
      },
      {
        text: "The Destination Address field is new in IPv6.",
        correct: false,
      },
      {
        text: "The Header Checksum field name from IPv4 is kept in IPv6.",
        correct: false,
      },
      {
        text: "The Time-to-Live field from IPv4 has been replaced by the Hop Limit field in IPv6.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "A network administrator wants to have the same network mask for all networks at a particular small site. The site has the following networks and number of devices: IP phones – 22 addresses PCs – 20 addresses needed Printers – 2 addresses needed Scanners – 2 addresses needed. The network administrator has deemed that 192.168.10.0/24 is to be the network used at this site. Which single subnet mask would make the most efficient use of the available addresses to use for the four subnetworks?",
    answers: [
      {
        text: "255.255.255.192",
        correct: false,
      },
      {
        text: "255.255.255.252",
        correct: false,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.248",
        correct: false,
      },
      {
        text: "255.255.255.0",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What characteristic describes identity theft?",
      answers: [
      {
        text: "the use of stolen credentials to access private data",
        correct: true,
      },
      {
        text: "software on a router that filters traffic based on IP addresses or applications",
        correct: false,
      },
      {
        text: "software that identifies fast-spreading threats",
        correct: false,
      },
      {
        text: "a tunneling protocol that provides remote users with secure access into the network of an organization",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "A network administrator is adding a new LAN to a branch office. The new LAN must support 200 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
      answers: [
      {
        text: "255.255.255.0",
         correct: true,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.248",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      " What are three commonly followed standards for constructing and installing cabling? (Choose three.)",
      answers: [
      {
        text: "cable lengths",
         correct: true,
      },
      {
        text: "cost per meter (foot)",
        correct: false,
      },
      {
        text: "connector color",
        correct: false,
      },
      {
        text: "tensile strength of plastic insulator",
        correct: false,
      },
      {
        text: "pinouts",
         correct: true,
      },
      {
        text: "connector types",
         correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      " Refer to the exhibit. What is wrong with the displayed termination?",
      answers: [
      {
        text: "The untwisted length of each wire is too long.",
        correct: true,
      },
      {
        text: "The woven copper braid should not have been removed.",
        correct: false,
      },
      {
        text: "The wrong type of connector is being used.",
        correct: false,
      },
      {
        text: "The wires are too thick for the connector that is used.",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i274300v1n1_209630-300x221-1.png?ezimgfmt=rs:235x173/rscb2/ng:webp/ngcb2",
    explanation: "When a cable to an RJ-45 connector is terminated, it is important to ensure that the untwisted wires are not too long and that the flexible plastic sheath surrounding the wires is crimped down and not the bare wires. None of the colored wires should be visible from the bottom of the jack."
  }, {
    question:
      "Match the characteristic to the category. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      }
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/38.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "A client packet is received by a server. The packet has a destination port number of 143. What service is the client requesting?",
      answers: [
      {
        text: "IMAP",
        correct: true,
      },
      {
        text: "FTP",
        correct: false,
      },
      {
        text: "SSH",
        correct: false,
      },
      {
        text: "TELNET",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What are two characteristics shared by TCP and UDP? (Choose two.)",
      answers: [
      {
        text: "default window size",
        correct: false,
      },
      {
        text: "connectionless communication",
        correct: false,
      },
      {
        text: "port numbering",
        correct: true,
      },
      {
        text: "3-way handshake",
        correct: false,
      },
      {
        text: "ability to to carry digitized voice",
        correct: false,
      },
      {
        text: "use of checksum",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "Both TCP and UDP use source and destination port numbers to distinguish different data streams and to forward the right data segments to the right applications. Error checking the header and data is done by both protocols by using a checksum calculation to determine the integrity of the data that is received. TCP is connection-oriented and uses a 3-way handshake to establish an initial connection. TCP also uses window to regulate the amount of traffic sent before receiving an acknowledgment. UDP is connectionless and is the best protocol for carry digitized VoIP signals."
  }, {
    question:
      "Refer to the exhibit. Which two network addresses can be assigned to the network containing 10 hosts? Your answers should waste the fewest addresses, not reuse addresses that are already assigned, and stay within the 10.18.10.0/24 range of addresses. (Choose two.)",
      answers: [
      {
        text: "10.18.10.200/28",
        correct: false,
      },
      {
        text: "10.18.10.240/27",
        correct: false,
      },
      {
        text: "10.18.10.208/28",
        correct: true,
      },
      {
        text: "10.18.10.200/27",
        correct: false,
      },
      {
        text: "10.18.10.224/27",
        correct: false,
      },
      {
        text: "10.18.10.224/28",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i274518v1n1_247518.png?ezimgfmt=ng:webp/ngcb2",
    explanation: "Addresses 10.18.10.0 through 10.18.10.63 are taken for the leftmost network. Addresses 192 through 199 are used by the center network. Because 4 host bits are needed to accommodate 10 hosts, a /28 mask is needed. 10.18.10.200/28 is not a valid network number. Two subnets that can be used are 10.18.10.208/28 and 10.18.10.224/28."
  }, {
    question:
      " A client packet is received by a server. The packet has a destination port number of 21. What service is the client requesting?",
      answers: [
      {
        text: "LDAP",
        correct: false,
      },
      {
        text: "FTP",
        correct: true,
      },
      {
        text: "SLP",
        correct: false,
      },
      {
        text: "SNMP",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What attribute of a NIC would place it at the data link layer of the OSI model?",
      answers: [
      {
        text: "attached Ethernet cable",
        correct: false,
      },
      {
        text: "MAC address",
        correct: true,
      },
      {
        text: "IP address",
        correct: false,
      },
      {
        text: "RJ-45 port",
        correct: false,
      },
      {
        text: "TCP/IP protocol stack",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "A network administrator is adding a new LAN to a branch office. The new LAN must support 10 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
      answers: [
      {
        text: "255.255.255.192",
        correct: false,
      },
      {
        text: "255.255.255.240",
        correct: true,
      },
      {
        text: "255.255.255.248",
        correct: false,
      },
      {
        text: "255.255.255.224",
         correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What technique is used with UTP cable to help protect against signal interference from crosstalk?",
      answers: [
      {
        text: "wrapping a foil shield around the wire pairs",
        correct: false,
      },
      {
        text: "twisting the wires together into pairs",
        correct: true,
      },
      {
        text: "terminating the cable with special grounded connectors",
        correct: false,
      },
      {
        text: "encasing the cables within a flexible plastic sheath",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "To help prevent the effects of crosstalk, UTP cable wires are twisted together into pairs. Twisting the wires together causes the magnetic fields of each wire to cancel each other out."
  }, {
    question:
      "Refer to the exhibit. The network administrator has assigned the LAN of LBMISS an address range of 192.168.10.0. This address range has been subnetted using a /29 prefix. In order to accommodate a new building, the technician has decided to use the fifth subnet for configuring the new network (subnet zero is the first subnet). By company policies, the router interface is always assigned the first usable host address and the workgroup server is given the last usable host address. Which configuration should be entered into the properties of the workgroup server to allow connectivity to the Internet?",
      answers: [
      {
        text: "IP address: 192.168.10.65 subnet mask: 255.255.255.240, default gateway: 192.168.10.76",
        correct: false,
      },
      {
        text: "IP address: 192.168.10.38 subnet mask: 255.255.255.248, default gateway: 192.168.10.33",
        correct: true,
      },
      {
        text: "IP address: 192.168.10.38 subnet mask: 255.255.255.240, default gateway: 192.168.10.33",
        correct: false,
      },
      {
        text: "IP address: 192.168.10.41 subnet mask: 255.255.255.248, default gateway: 192.168.10.46",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2017/05/i209840v1n3_209840.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Using a /29 prefix to subnet 192.168.10.0 results in subnets that increment by 8: 192.168.10.0 (1), 192.168.10.8 (2), 192.168.10.16 (3), 192.168.10.24 (4), 192.168.10.32 (5)"
  }, {
    question:
      "Refer to the exhibit. The switches are in their default configuration. Host A needs to communicate with host D, but host A does not have the MAC address for its default gateway. Which network hosts will receive the ARP request sent by host A?",
      answers: [
      {
        text: "only host D",
        correct: false,
      },
      {
        text: "only router R1",
        correct: false,
      },
      {
        text: "only hosts B, C, and router R1",
        correct: true,
      },
      {
        text: "only hosts A, B, C, and D",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2016/03/i275353v1n1_275353.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Since host A does not have the MAC address of the default gateway in its ARP table, host A sends an ARP broadcast. The ARP broadcast would be sent to every device on the local network. Hosts B, C, and router R1 would receive the broadcast. Router R1 would not forward the message."
  }, {
    question:
      "Match a statement to the related network model. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2022-05-12_101113.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: "Peer-to-peer networks do not require the use of a dedicated server, and devices can assume both client and server roles simultaneously on a per request basis. Because they do not require formalized accounts or permissions, they are best used in limited situations. Peer-to-peer applications require a user interface and background service to be running, and can be used in more diverse situations.",
  }, {
    question:
      "Refer to the exhibit. A network engineer has been given the network address of 192.168.99.0 and a subnet mask of 255.255.255.192 to subnet across the four networks shown. How many total host addresses are unused across all four subnets?",
      answers: [
      {
        text: "88",
        correct: false,
      },
      {
        text: "72",
        correct: false,
      },
      {
        text: "200",
        correct: true,
      },
      {
        text: "154",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/06/i304957v1n1_209418-1591171569.7915.png?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "A client packet is received by a server. The packet has a destination port number of 22. What service is the client requesting?",
      answers: [
      {
        text: "SMB/CIFS",
        correct: false,
      },
      {
        text: "HTTPS",
        correct: false,
      },
      {
        text: "SSH",
        correct: true,
      },
      {
        text: "SLP",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What characteristic describes an IPS?",
      answers: [
      {
        text: "a tunneling protocol that provides remote users with secure access into the network of an organization",
        correct: false,
      },
      {
        text: "software that identifies fast-spreading threats",
        correct: false,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: true,
      },
      {
        text: "software on a router that filters traffic based on IP addresses or applications",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "IPS – An intrusion prevention system (IPS) monitors incoming and outgoing traffic looking for malware, network attack signatures, and more. If it recognizes a threat, it can immediately stop it."
  }, {
    question:
      "What service is provided by DHCP?",
      answers: [
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
      {
        text: "Allows remote access to network devices and servers.",
        correct: false,
      },
      {
        text: "Dynamically assigns IP addresses to end and intermediary devices.",
        correct: true,
      },
      {
        text: "Uses encryption to provide secure remote access to network devices and servers.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Match the header field with the appropriate layer of the OSI model. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2020-03-26_173114.png?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "Refer to the exhibit. The switches have a default configuration. Host A needs to communicate with host D, but host A does not have the MAC address for the default gateway. Which network devices will receive the ARP request sent by host A?",
      answers: [
      {
        text: "An application that allows real-time chatting among remote users.",
        correct: false,
      },
      {
        text: "only hosts A, B, C, and D",
        correct: false,
      },
      {
        text: "only hosts B, C, and router R1",
        correct: true,
      },
      {
        text: "only host D",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/12/i360201v3n1_275353-1608482322.6606.png?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "Which wireless technology has low-power and low-data rate requirements making it popular in IoT environments?",
      answers: [
      {
        text: "Bluetooth",
        correct: false,
      },
      {
        text: "WiMAX",
        correct: false,
      },
      {
        text: "Zigbee",
        correct: true,
      },
      {
        text: "Wi-Fi",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "Zigbee is a specification used for low-data rate, low-power communications. It is intended for applications that require short-range, low data-rates and long battery life. Zigbee is typically used for industrial and Internet of Things (IoT) environments such as wireless light switches and medical device data collection."
  }, {
    question:
      "What two ICMPv6 message types must be permitted through IPv6 access control lists to allow resolution of Layer 3 addresses to Layer 2 MAC addresses? (Choose two.)",
      answers: [
      {
        text: "neighbor solicitations",
        correct: true,
      },
      {
        text: "echo requests",
        correct: false,
      },
      {
        text: "neighbor advertisements",
        correct: true,
      },
      {
        text: "router solicitations",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "A client is using SLAAC to obtain an IPv6 address for its interface. After an address has been generated and applied to the interface, what must the client do before it can begin to use this IPv6 address?",
       answers: [
      {
        text: "It must send a DHCPv6 INFORMATION-REQUEST message to request the address of the DNS server.",
        correct: false,
      },
      {
        text: "It must send a DHCPv6 REQUEST message to the DHCPv6 server to request permission to use this address.",
        correct: false,
      },
      {
        text: "It must send an ICMPv6 Neighbor Solicitation message to ensure that the address is not already in use on the network.",
        correct: true,
      },
      {
        text: "It must send an ICMPv6 Router Solicitation message to determine what default gateway it should use.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Two pings were issued from a host on a local network. The first ping was issued to the IP address of the default gateway of the host and it failed. The second ping was issued to the IP address of a host outside the local network and it was successful. What is a possible cause for the failed ping?",
      answers: [
      {
        text: "The default gateway is not operational.",
        correct: false,
      },
      {
        text: "The default gateway device is configured with the wrong IP address.",
        correct: false,
      },
      {
        text: "Security rules are applied to the default gateway device, preventing it from processing ping requests.",
        correct: true,
      },
      {
        text: "The TCP/IP stack on the default gateway is not working properly.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "An organization is assigned an IPv6 address block of 2001:db8:0:ca00::/56. How many subnets can be created without using bits in the interface ID space?",
      answers: [
      {
        text: "512",
        correct: false,
      },
      {
        text: "1024",
        correct: false,
      },
      {
        text: "256",
        correct: true,
      },
      {
        text: "4096",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What subnet mask is needed if an IPv4 network has 40 devices that need IP addresses and address space is not to be wasted?",
      answers: [
      {
        text: "255.255.255.0",
        correct: false,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.192",
        correct: true,
      },
      {
        text: "255.255.255.224",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Refer to the exhibit. If host A sends an IP packet to host B, what will the destination address be in the frame when it leaves host A?",
      answers: [
      {
        text: "172.168.10.65",
        correct: false,
      },
      {
        text: "172.168.10.99",
        correct: false,
      },
      {
        text: "BB:BB:BB:BB:BB:BB",
        correct: true,
      },
      {
        text: "DD:DD:DD:DD:DD:DD",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i274590v1n1_274590.png?ezimgfmt=rs:453x228/rscb2/ng:webp/ngcb2",
    explanation: "When a host sends information to a distant network, the Layer 2 frame header will contain a source and destination MAC address. The source address will be the originating host device. The destination address will be the router interface that connects to the same network. In the case of host A sending information to host B, the source address is AA:AA:AA:AA:AA:AA and the destination address is the MAC address assigned to the R2 Ethernet interface, BB:BB:BB:BB:BB:BB."
  }, {
    question:
      "What is a benefit of using cloud computing in networking?",
      answers: [
      {
        text: "Technology is integrated into every-day appliances allowing them to interconnect with other devices, making them more ‘smart’ or automated.",
        correct: false,
      },
      {
        text: "End users have the freedom to use personal tools to access information and communicate across a business network.",
        correct: false,
      },
      {
        text: "Network capabilities are extended without requiring investment in new infrastructure, personnel, or software.",
        correct: true,
      },
      {
        text: "Home networking uses existing electrical wiring to connect devices to the network wherever there is an electrical outlet, saving the cost of installing data cables.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "Cloud computing extends IT’s capabilities without requiring investment in new infrastructure, training new personnel, or licensing new software. These services are available on-demand and delivered economically to any device anywhere in the world without compromising security or function. BYOD is about end users having the freedom to use personal tools to access information and communicate across a business or campus network. Smart home technology is integrated into every-day appliances allowing them to interconnect with other devices, making them more ‘smart’ or automated. Powerline networking is a trend for home networking that uses existing electrical wiring to connect devices to the network wherever there is an electrical outlet, saving the cost of installing data cables.",
  }, {
    question:
      "Which two statements are correct about MAC and IP addresses during data transmission if NAT is not involved? (Choose two.)",
      answers: [
      {
        text: "Destination IP addresses in a packet header remain constant along the entire path to a target host",
        correct: true,
      },
      {
        text: "Every time a frame is encapsulated with a new destination MAC address, a new destination IP address is needed.",
        correct: false,
      },
      {
        text: "Destination and source MAC addresses have local significance and change every time a frame goes from one LAN to another.",
        correct: true,
      },
      {
        text: "A packet that has crossed four routers has changed the destination IP address four times",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "What is one main characteristic of the data link layer?",
      answers: [
      {
        text: "It converts a stream of data bits into a predefined code.",
        correct: false,
      },
      {
        text: "It generates the electrical or optical signals that represent the 1 and 0 on the media.",
        correct: false,
      },
      {
        text: "It shields the upper layer protocol from being aware of the physical medium to be used in the communication.",
        correct: true,
      },
      {
        text: "It accepts Layer 3 packets and decides the path by which to forward the packet to a remote network.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      " What are three characteristics of the CSMA/CD process? (Choose three.)",
       answers: [
      {
        text: "A device listens and waits until the media is not busy before transmitting.",
        correct: true,
      },
      {
        text: "The device with the electronic token is the only one that can transmit after a collision.",
        correct: false,
      },
      {
        text: "After detecting a collision, hosts can attempt to resume transmission after a random time delay has expired.",
        correct: true,
      },
      {
        text: "A jam signal indicates that the collision has cleared and the media is not busy.",
        correct: false,
      },
      {
        text: "All of the devices on a segment see data that passes on the network medium.",
        correct: false,
      },
      {
        text: "Devices can be configured with a higher transmission priority.",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The Carrier Sense Multiple Access/Collision Detection (CSMA/CD) process is a contention-based media access control mechanism used on shared media access networks, such as Ethernet. When a device needs to transmit data, it listens and waits until the media is available (quiet), then it will send data. If two devices transmit at the same time, a collision will occur. Both devices will detect the collision on the network. When a device detects a collision, it will stop the data transmission process, wait for a random amount of time, then try again."
  }, {
    question:
      ". Which information does the show startup-config command display?",
      answers: [
      {
        text: "the IOS image copied into RAM",
         correct: true,
      },
      {
        text: "the bootstrap program in the ROM",
        correct: false,
      },
      {
        text: "the contents of the saved configuration file in the NVRAM",
         correct: true,
      },
      {
        text: "the contents of the current running configuration file in the RAM",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "The show startup-config command displays the saved configuration located in NVRAM. The show running-config command displays the contents of the currently running configuration file located in RAM.​",
  }, {
    question:
      "Which two commands can be used on a Windows host to display the routing table? (Choose two.)",
      answers: [
      {
        text: "route print",
        correct: true,
      },
      {
        text: "netstat -r",
        correct: true,
      },
      {
        text: "show ip route",
        correct: false,
      },
      {
        text: "netstat -s",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "On a Windows host, the route print or netstat -r commands can be used to display the host routing table. Both commands generate the same output. On a router, the show ip route command is used to display the routing table. The netstat –s command is used to display per-protocol statistics. The tracert command is used to display the path that a packet travels to its destination.",
  }, {
    question:
      "What are two functions that are provided by the network layer? (Choose two.)",
      answers: [
      {
        text: "directing data packets to destination hosts on other networks",
        correct: true,
      },
      {
        text: "providing end devices with a unique network identifier",
        correct: true,
      },
      {
        text: "carrying data between processes that are running on source and destination hosts",
        correct: false,
      },
      {
        text: "placing data on the network medium",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "Which two statements describe features of an IPv4 routing table on a router? (Choose two.)​",
      answers: [
      {
        text: "It stores information about routes derived from the active router interfaces.",
        correct: true,
      },
      {
        text: "If a default static route is configured in the router, an entry will be included in the routing table with source code S .",
        correct: true,
      },
      {
        text: "The routing table lists the MAC addresses of each active interface.",
        correct: false,
      },
      {
        text: "The netstat -r command can be used to display the routing table of a router.​",
        correct: false,
      },
      {
        text: "If there are two or more possible routes to the same destination, the route associated with the higher metric value is included in the routing table.",
        correct: false,
      },
      {
        text: "Directly connected interfaces will have two route source codes in the routing table: C and S .",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "What characteristic describes a VPN?",
      answers: [
      {
        text: "a tunneling protocol that provides remote users with secure access into the network of an organization",
        correct: true,
      },
      {
        text: "software on a router that filters traffic based on IP addresses or applications",
        correct: false,
      },
      {
        text: "software that identifies fast-spreading threats",
        correct: false,
      },
      {
        text: "a network device that filters access and traffic coming into a network",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "",
  }, {
    question:
      "Why would a Layer 2 switch need an IP address?",
      answers: [
      {
        text: "to enable the switch to be managed remotely",
        correct: true,
      },
      {
        text: "to enable the switch to send broadcast frames to attached PCs",
        correct: false,
      },
      {
        text: "to enable the switch to function as a default gateway",
        correct: false,
      },
      {
        text: "to enable the switch to receive frames from attached PCs",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A switch, as a Layer 2 device, does not need an IP address to transmit frames to attached devices. However, when a switch is accessed remotely through the network, it must have a Layer 3 address. The IP address must be applied to a virtual interface rather than to a physical interface. Routers, not switches, function as default gateways.",
  }, {
    question:
      "Match each description to its corresponding term. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/17.jpg?ezimgfmt=rs:665x665/rscb2/ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "A user sends an HTTP request to a web server on a remote network. During encapsulation for this request, what information is added to the address field of a frame to indicate the destination?",
      answers: [
      {
        text: "the MAC address of the default gateway",
        correct: true,
      },
      {
        text: "the network domain of the destination host",
        correct: false,
      },
      {
        text: "the IP address of the default gateway",
        correct: false,
      },
      {
        text: "the MAC address of the destination host",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A frame is encapsulated with source and destination MAC addresses. The source device will not know the MAC address of the remote host. An ARP request will be sent by the source and will be responded to by the router. The router will respond with the MAC address of its interface, the one which is connected to the same network as the source."
  }, {
    question:
      "What is an advantage to using a protocol that is defined by an open standard?",
      answers: [
      {
        text: "A company can monopolize the market.",
        correct: false,
      },
      {
        text: "The protocol can only be run on equipment from a specific vendor.",
        correct: false,
      },
      {
        text: "An open standard protocol is not controlled or regulated by standards organizations.",
        correct: false,
      },
      {
        text: "It encourages competition and promotes choices.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "A monopoly by one company is not a good idea from a user point of view. If a protocol can only be run on one brand, it makes it difficult to have mixed equipment in a network. A proprietary protocol is not free to use. An open standard protocol will in general be implemented by a wide range of vendors."
  }, {
    question:
      "Data is being sent from a source PC to a destination server. Which three statements correctly describe the function of TCP or UDP in this situation? (Choose three.)",
      answers: [
      {
        text: "The TCP process running on the PC randomly selects the destination port when establishing a session with the server.",
        correct: false,
      },
      {
        text: "TCP is the preferred protocol when a function requires lower network overhead.",
        correct: false,
      },
      {
        text: "The TCP source port number identifies the sending host on the network",
        correct: false,
      },
      {
        text: "The source port field identifies the running application or service that will handle data returning to the PC.",
        correct: true,
      },
      {
        text: "UDP segments are encapsulated within IP packets for transport across the network.",
        correct: true,
      },
      {
        text: "The UDP destination port number identifies the application or service on the server which will handle the data.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "Layer 4 port numbers identify the application or service which will handle the data. The source port number is added by the sending device and will be the destination port number when the requested information is returned. Layer 4 segments are encapsulated within IP packets. UDP, not TCP, is used when low overhead is needed. A source IP address, not a TCP source port number, identifies the sending host on the network. Destination port numbers are specific ports that a server application or service monitors for requests."
  }, {
    question:
      "Match each description with the corresponding TCP mechanism. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/20.jpg?ezimgfmt=rs:655x506/rscb2/ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "Refer to the exhibit. A company uses the address block of 128.107.0.0/16 for its network. What subnet mask would provide the maximum number of equal size subnets while providing enough host addresses for each subnet in the exhibit?",
      answers: [
      {
        text: "255.255.255.128",
        correct: true,
      },
      {
        text: "255.255.255.192",
        correct: false,
      },
      {
        text: "255.255.255.240",
        correct: false,
      },
      {
        text: "255.255.255.0",
        correct: false,
      },
      {
        text: "255.255.255.224",
        correct: false,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/i207609v1n1_207609.png?ezimgfmt=rs:571x419/rscb2/ng:webp/ngcb2",
    explanation: "The largest subnet in the topology has 100 hosts in it so the subnet mask must have at least 7 host bits in it (27-2=126). 255.255.255.0 has 8 hosts bits, but this does not meet the requirement of providing the maximum number of subnets."
  }, {
    question:
      "A network administrator wants to have the same subnet mask for three subnetworks at a small site. The site has the following networks and numbers of devices: Subnetwork A: IP phones – 10 addresses, Subnetwork B: PCs – 8 addresses, Subnetwork C: Printers – 2 addresses. What single subnet mask would be appropriate to use for the three subnetworks?",
      answers: [
      {
        text: "255.255.255.252",
        correct: false,
      },
      {
        text: "255.255.255.248",
        correct: false,
      },
      {
        text: "255.255.255.0",
        correct: false,
      },
      {
        text: "255.255.255.240",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "If the same mask is to be used, then the network with the most hosts must be examined for number of hosts. Because this is 10 hosts, 4 host bits are needed. The /28 or 255.255.255.240 subnet mask would be appropriate to use for these networks. ​",
  }, {
    question:
      "Match each item to the type of topology diagram on which it is typically identified. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/24.jpg?ezimgfmt=rs:655x293/rscb2/ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "What two pieces of information are displayed in the output of the show ip interface brief command? (Choose two.)",
      answers: [
      {
        text: "speed and duplex settings",
        correct: false,
      },
      {
        text: "next-hop addresses",
        correct: false,
      },
      {
        text: "interface descriptions",
        correct: false,
      },
      {
        text: "IP addresses",
        correct: true,
      },
      {
        text: "Layer 1 statuses",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "The command show ip interface brief shows the IP address of each interface, as well as the operational status of the interfaces at both Layer 1 and Layer 2. In order to see interface descriptions and speed and duplex settings, use the command show running-config interface. Next-hop addresses are displayed in the routing table with the command show ip route, and the MAC address of an interface can be seen with the command show interfaces.",
  }, {
    question:
      "A user is complaining that an external web page is taking longer than normal to load.The web page does eventually load on the user machine. Which tool should the technician use with administrator privileges in order to locate where the issue is in the network?",
      answers: [
      {
        text: "ping",
        correct: false,
      },
      {
        text: "nslookup",
        correct: false,
      },
      {
        text: "ipconfig /displaydns",
        correct: false,
      },
      {
        text: "tracert",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Which value, that is contained in an IPv4 header field, is decremented by each router that receives a packet?",
      answers: [
      {
        text: "Header Length",
        correct: false,
      },
      {
        text: "Differentiated Services",
        correct: false,
      },
      {
        text: "Fragment Offset",
        correct: false,
      },
      {
        text: "Time-to-Live",
        correct: true,
      },
    ],
    photograph: "",
    explanation: "When a router receives a packet, the router will decrement the Time-to-Live (TTL) field by one. When the field reaches zero, the receiving router will discard the packet and will send an ICMP Time Exceeded message to the sender."
  }, {
    question:
      "A network technician is researching the use of fiber optic cabling in a new technology center. Which two issues should be considered before implementing fiber optic media? (Choose two.)",
      answers: [
      {
        text: "Fiber optic cabling requires different termination and splicing expertise from what copper cabling requires.",
        correct: true,
      },
      {
        text: "Fiber optic cabling requires specific grounding to be immune to EMI.",
        correct: false,
      },
      {
        text: "ipconfig /displaydnsFiber optic cabling is susceptible to loss of signal due to RFI.",
        correct: false,
      },
      {
        text: "Fiber optic provides higher data capacity but is more expensive than copper cabling.",
        correct: true,
      },
    ],
    photograph: "",
    explanation: ""
  }, {
    question:
      "Match each description with an appropriate IP address. (Not all options are used.)",
      answers: [
      {
        text: "bafta",
        correct: true,
      },
    ],
    photograph: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-11-13_111242.jpg?ezimgfmt=ng:webp/ngcb2",
    explanation: ""
  }, {
    question:
      "A user is executing a tracert to a remote device. At what point would a router, which is in the path to the destination device, stop forwarding the packet?",
      answers: [
      {
        text: "when the value in the TTL field reaches zero",
        correct: true,
      },
      {
        text: "when the router receives an ICMP Time Exceeded message",
        correct: false,
      },
      {
        text: "when the RTT value reaches zero",
        correct: false,
      },
      {
        text: "when the values of both the Echo Request and Echo Reply messages reach zero",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "When a router receives a traceroute packet, the value in the TTL field is decremented by 1. When the value in the field reaches zero, the receiving router will not forward the packet, and will send an ICMP Time Exceeded message back to the source."
  }, {
    question:
      "Users report that the network access is slow. After questioning the employees, the network administrator learned that one employee downloaded a third-party scanning program for the printer. What type of malware might be introduced that causes slow performance of the network?",
      answers: [
      {
        text: "worm",
        correct: true,
      },
      {
        text: "virus",
        correct: false,
      },
      {
        text: "phishing",
        correct: false,
      },
      {
        text: "spam",
        correct: false,
      },
    ],
    photograph: "",
    explanation: "A cybersecurity specialist needs to be familiar with the characteristics of the different types of malware and attacks that threaten an organization.",
  }
  
];
