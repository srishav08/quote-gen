import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


export async function exportNodeToPdf(node, fileName){
const canvas = await html2canvas(node, { scale: 2, useCORS: true })
const imgData = canvas.toDataURL('image/png')
const pdf = new jsPDF('p','pt','a4')
const pageWidth = pdf.internal.pageSize.getWidth()
const imgWidth = pageWidth
const imgHeight = canvas.height * imgWidth / canvas.width
let heightLeft = imgHeight
let position = 0
while (heightLeft > 0) {
pdf.addImage(imgData, 'PNG', 0, position ? 20 : 0, imgWidth, imgHeight)
heightLeft -= pdf.internal.pageSize.getHeight()
if (heightLeft > 0) pdf.addPage()
}
pdf.save(fileName)
}