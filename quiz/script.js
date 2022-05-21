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
      "",
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
        correct: false,
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
  },
];
