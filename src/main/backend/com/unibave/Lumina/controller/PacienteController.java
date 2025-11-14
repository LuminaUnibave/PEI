package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Paciente.PacienteAtualizarDTO;
import com.unibave.Lumina.DTOs.Paciente.PacienteMapper;
import com.unibave.Lumina.DTOs.Paciente.PacienteRequisicaoDTO;
import com.unibave.Lumina.DTOs.Paciente.PacienteRespostaDTO;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.service.PacienteService;
import com.unibave.Lumina.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
@Tag(name = "Paciente", description = "Controller de Paciente")
public class PacienteController {

    private final PacienteService pacienteService;
    private final PacienteMapper pacienteMapper;
    private final UsuarioService usuarioService;

    @Autowired
    public PacienteController(PacienteService pacienteService, PacienteMapper pacienteMapper, UsuarioService usuarioService){
        this.pacienteService = pacienteService;
        this.pacienteMapper = pacienteMapper;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/contar")
    @Operation(summary = "Contar todos os pacientes", description = "Conta a quantidade de pacientes")
    public ResponseEntity<Long> contar(){
        long contador = pacienteService.contar();
        return ResponseEntity.ok(contador);
    }

    @GetMapping("/buscar/todos")
    @Operation(summary = "Buscar todos os pacientes", description = "Retorna todos os pacientes")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarTodos() {
        List<Paciente> pacientes = pacienteService.buscarTodos();
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar paciente por ID", description = "Retorna o paciente pelo seu identificador único")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente encontrado"),
            @ApiResponse(responseCode = "404", description = "Paciente não encontrado")
    })
    public ResponseEntity<PacienteRespostaDTO> buscarPorId(@RequestParam("id") Long id) {
        Paciente paciente = pacienteService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        return ResponseEntity.ok(pacienteMapper.toDto(paciente));
    }

    @GetMapping("/buscar/nome")
    @Operation(summary = "Buscar paciente por nome", description = "Retorna o(s) paciente(s) pelo nome")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorNome(@RequestParam("nome") String nome) {
        List<Paciente> pacientes = pacienteService.buscarPorNome(nome);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/cpf")
    @Operation(summary = "Buscar paciente por CPF", description = "Retorna o paciente pelo seu CPF (único)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente encontrado"),
            @ApiResponse(responseCode = "404", description = "Paciente não encontrado")
    })
    public ResponseEntity<PacienteRespostaDTO> buscarPorCpf(@RequestParam("cpf") String cpf) {
        Paciente paciente = pacienteService.buscarPorCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        return ResponseEntity.ok(pacienteMapper.toDto(paciente));
    }

    @GetMapping("/buscar/situacao")
    @Operation(summary = "Buscar paciente por situação", description = "Retorna o(s) paciente(s) pela situação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorSituacao(@RequestParam("situacao") Situacao situacao) {
        List<Paciente> pacientes = pacienteService.buscarPorSituacao(situacao);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtNascimento")
    @Operation(summary = "Buscar paciente pela data de nascimento", description = "Retorna o(s) paciente(s) pela data de nascimento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtNascimento(@RequestParam("dtNascimento") LocalDate dtNascimento) {
        List<Paciente> pacientes = pacienteService.buscarPorDtNascimento(dtNascimento);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtNascimento/antes")
    @Operation(summary = "Buscar paciente pela data de nascimento antes do período", description = "Retorna o(s) paciente(s) pela data de nascimento antes do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtNascimentoAntes(@RequestParam("antes") LocalDate antes) {
        List<Paciente> pacientes = pacienteService.buscarPorDtNascimentoAntes(antes);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtNascimento/depois")
    @Operation(summary = "Buscar paciente pela data de nascimento depois do período", description = "Retorna o(s) paciente(s) pela data de nascimento depois do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtNascimentoDepois(@RequestParam("depois") LocalDate depois) {
        List<Paciente> pacientes = pacienteService.buscarPorDtNascimentoDepois(depois);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtNascimento/entre")
    @Operation(summary = "Buscar paciente pela data de nascimento entre o período", description = "Retorna o(s) paciente(s) pela data de nascimento entre o período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtNascimentoEntre(
            @RequestParam("depois") LocalDate depois,
            @RequestParam("antes") LocalDate antes) {
        List<Paciente> pacientes = pacienteService.buscarPorDtNascimentoEntre(depois, antes);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/crtsus")
    @Operation(summary = "Buscar paciente pelo cartão SUS", description = "Retorna o paciente pelo cartão SUS (único)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente encontrado"),
            @ApiResponse(responseCode = "404", description = "Paciente não encontrado")
    })
    public ResponseEntity<PacienteRespostaDTO> buscarPorCrtSus(@RequestParam("crtsus") String crtSus) {
        Paciente paciente = pacienteService.buscarPorCrtSus(crtSus)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        return ResponseEntity.ok(pacienteMapper.toDto(paciente));
    }

    @GetMapping("/buscar/email")
    @Operation(summary = "Buscar paciente por email", description = "Retorna o(s) paciente(s) pelo email")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorEmail(@RequestParam("email") String email) {
        List<Paciente> pacientes = pacienteService.buscarPorEmail(email);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtCadastro")
    @Operation(summary = "Buscar paciente pela data de cadastro", description = "Retorna o(s) paciente(s) pela data de cadastro")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtCadastro(@RequestParam("dtCadastro") LocalDateTime dtCadastro) {
        List<Paciente> pacientes = pacienteService.buscarPorDtCadastro(dtCadastro);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtCadastro/antes")
    @Operation(summary = "Buscar paciente pela data de cadastro antes do período", description = "Retorna o(s) paciente(s) pela data de cadastro antes do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtCadastroAntes(@RequestParam("antes") LocalDateTime antes) {
        List<Paciente> pacientes = pacienteService.buscarPorDtCadastroAntes(antes);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtCadastro/depois")
    @Operation(summary = "Buscar paciente pela data de cadastro depois do período", description = "Retorna o(s) paciente(s) pela data de cadastro depois do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtCadastroDepois(@RequestParam("depois") LocalDateTime depois) {
        List<Paciente> pacientes = pacienteService.buscarPorDtCadastroDepois(depois);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @GetMapping("/buscar/dtcadastro/entre")
    @Operation(summary = "Buscar paciente pela data de cadastro entre o período", description = "Retorna o(s) paciente(s) pela data de cadastro entre o período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "Paciente(s) não encontrado(s)")
    })
    public ResponseEntity<List<PacienteRespostaDTO>> buscarPorDtCadastroEntre(
            @RequestParam("depois") LocalDateTime depois,
            @RequestParam("antes") LocalDateTime antes) {
        List<Paciente> pacientes = pacienteService.buscarPorDtCadastroEntre(depois, antes);
        List<PacienteRespostaDTO> pacienteDTOs = pacienteMapper.toDto(pacientes);
        return ResponseEntity.ok(pacienteDTOs);
    }

    @PostMapping("/salvar")
    @Operation(summary = "Salvar paciente", description = "Salva o paciente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente salvo"),
            @ApiResponse(responseCode = "404", description = "Paciente não salvo")
    })
    public ResponseEntity<PacienteRespostaDTO> salvar(@RequestBody PacienteRequisicaoDTO pacienteRequisicaoDTO) {
        Paciente paciente = pacienteMapper.toEntity(pacienteRequisicaoDTO);
        Optional<Usuario> usuario = usuarioService.buscarPorId(pacienteRequisicaoDTO.getIdUsuario());
        paciente.setUsuario(usuario.get());
        paciente = pacienteService.salvar(paciente);
        return ResponseEntity.ok(pacienteMapper.toDto(paciente));
    }

    @PutMapping("/atualizar")
    @Operation(summary = "Atualizar paciente", description = "Atualiza o paciente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente atualizado"),
            @ApiResponse(responseCode = "404", description = "Paciente não atualizado")
    })
    public ResponseEntity<PacienteRespostaDTO> atualizar(@RequestBody PacienteAtualizarDTO pacienteAtualizarDTO) {
        // CORREÇÃO CRÍTICA: Buscar a entidade existente primeiro
        Paciente pacienteExistente = pacienteService.buscarPorId(pacienteAtualizarDTO.getId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        // Atualizar apenas os campos necessários
        pacienteExistente.setNome(pacienteAtualizarDTO.getNome());
        pacienteExistente.setSobrenome(pacienteAtualizarDTO.getSobrenome());
        pacienteExistente.setCpf(pacienteAtualizarDTO.getCpf());
        pacienteExistente.setDtNascimento(pacienteAtualizarDTO.getDtNascimento());
        pacienteExistente.setCrtSus(pacienteAtualizarDTO.getCrtSus());
        pacienteExistente.setEmail(pacienteAtualizarDTO.getEmail());
        pacienteExistente.setContato(pacienteAtualizarDTO.getContato());

        // Atualizar usuário se necessário
        if (!pacienteExistente.getUsuario().getId().equals(pacienteAtualizarDTO.getIdUsuario())) {
            Optional<Usuario> usuario = usuarioService.buscarPorId(pacienteAtualizarDTO.getIdUsuario());
            pacienteExistente.setUsuario(usuario.get());
        }

        // Salvar a entidade gerenciada
        Paciente pacienteAtualizado = pacienteService.salvar(pacienteExistente);
        return ResponseEntity.ok(pacienteMapper.toDto(pacienteAtualizado));
    }

    @DeleteMapping("/deletar/id")
    @Operation(summary = "Deletar paciente", description = "Deleta o paciente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente deletado"),
            @ApiResponse(responseCode = "404", description = "Paciente não deletado")
    })
    public ResponseEntity<Void> deletar(@RequestParam("id") Long id) {
        pacienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}